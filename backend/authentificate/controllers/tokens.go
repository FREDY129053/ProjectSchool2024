package controllers

import (
	"account_service/database"
	"account_service/helpers"
	"account_service/models"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
)

// Переменные БД и секрета
var (
	databaseConn = database.GetConnection()
	jwtKey = []byte("9e419115-a86a-4ebb-b619-2334d5bfe89e")
)


// SignUp godoc
// SignUp регистрация аккаунта
// @Summary Регистрация аккаунта
// @Description Регистрация аккаунта и установка токенов
// @Tags Users
// @Accept json
// @Produce json
// @Param info body models.SignUpData true "Данные для входа"
// @Success 200 {object} models.TokenResponse "access_token"
// @Failure 400 {object} models.ErrorResponse "invalid request"
// @Failure 500 {object} models.ErrorResponse "cannot create account"
// @Router /SignUp [post]
func SignUp(c *gin.Context) {
	var inputData models.SignUpData

	// Проверка данных
	if err := c.ShouldBind(&inputData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	// Проверка на сущестование пользователя по номеру
	var existingUser models.UserInfo
	row := databaseConn.QueryRow("SELECT phone_number FROM users WHERE phone_number=$1", inputData.Phone)
	if err := row.Scan(&existingUser.PhoneNumber); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user already exists"})
		c.Abort()
		return
	}

	// Хэш пароля
	hashedPassword, err := helpers.HashPassword(inputData.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot hash password"})
		c.Abort()
		return
	}

	// Занос пользователя
	_, err = databaseConn.Exec("INSERT INTO users(phone_number, password) VALUES($1, $2)", inputData.Phone, hashedPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot create user"})
    c.Abort()
    return
	}

	accessToken, err := helpers.GenerateToken(inputData.Phone, helpers.AccessToken, jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot generate token"})
    c.Abort()
    return
	}
	refreshToken, err := helpers.GenerateToken(inputData.Phone, helpers.RefreshToken, jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot generate token"})
    c.Abort()
    return
	}

	c.SetCookie("token_refresh", refreshToken, int(time.Now().Add(24 * time.Hour).Unix()), "/", "localhost", false, true)

	c.JSON(http.StatusCreated, gin.H{"access_token": accessToken})
}


// SignIn godoc
// SignIn вход в аккаунт
// @Summary Вход в аккаунт
// @Description Вход в аккаунт и установка токенов
// @Tags Users
// @Accept json
// @Produce json
// @Param info body models.SignUpData true "Данные для входа"
// @Success 200 {object} models.TokenResponse "access_token"
// @Failure 400 {object} models.ErrorResponse "invalid request"
// @Failure 404 {object} models.ErrorResponse "user not found"
// @Failure 500 {object} models.ErrorResponse "cannot generate token"
// @Router /SignIn [post]
func SignIn(c *gin.Context) {
	var inputData models.SignUpData

	// Проверка данных
	if err := c.ShouldBind(&inputData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		c.Abort()
		return
	}

	// Проверка на сущестование пользователя по номеру
	var existingUser models.UserInfo
	row := databaseConn.QueryRow("SELECT phone_number, password FROM users WHERE phone_number=$1", inputData.Phone)
	if err := row.Scan(&existingUser.PhoneNumber, &existingUser.Password); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		c.Abort()
		return
	}

	// Проверка пароля
	isPasswordValid := helpers.CheckPasswordHash(inputData.Password, existingUser.Password)
	if !isPasswordValid {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid password"})
		c.Abort()
		return
	}

	// Генерация токенов
	accessToken, err := helpers.GenerateToken(inputData.Phone, helpers.AccessToken, jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot generate token"})
    c.Abort()
    return
	}
	refreshToken, err := helpers.GenerateToken(inputData.Phone, helpers.RefreshToken, jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot generate token"})
    c.Abort()
    return
	}

	c.SetCookie("token_refresh", refreshToken, int(time.Now().Add(24 * time.Hour).Unix()), "/", "localhost", false, true)

	c.JSON(http.StatusCreated, gin.H{"access_token": accessToken})
}