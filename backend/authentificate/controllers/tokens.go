package controllers

import (
	"account_service/database"
	"account_service/helpers"
	"account_service/models"
	"log"
	"math"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// Переменные БД и секрета
var (
	databaseConn = database.GetConnection()
	jwtKey = []byte("9e419115-a86a-4ebb-b619-2334d5bfe89e")
)


// SetMinDate godoc
// StMinDate Указание минимального дня в базе данных
// @Summary Указание минмального дня в базе данных
// @Description Указатние какая дата в БД будет минимальной. Нужно для тестов
// @Tags Dates
// @Accept json
// @Produce json
// @Param minDay path string true "Day"
// @Router /set_min_day/{minDay} [put]
func SetMinDate(c *gin.Context) {
	dateDay := c.Param("minDay")
	currDay, err := strconv.Atoi(dateDay)
	if err != nil {
		c.JSON(400, gin.H{"message": "parameter minDay should be a number"})
		c.Abort()
		return
	}

	var dbDate int
	minDBDate := databaseConn.QueryRow("select extract(day from min(date)) from dates")
	if err := minDBDate.Scan(&dbDate); err != nil {
		log.Fatal(err.Error())
	}

	diffDate := math.Abs(float64(currDay - dbDate))

	query := `
        UPDATE dates
        SET date = date + ($1 || ' days')::INTERVAL;
	`

	_, err = databaseConn.Exec(query, diffDate)
	if err!= nil {
    log.Fatal(err.Error())
  }
}


// GetDates godoc
// GetDates Получение дат
// @Summary Получение дат
// @Description Получение всех дат из БД
// @Tags Dates
// @Accept json
// @Produce json
// @Success 200
// @Router /all_dates [get]
func GetDates(c *gin.Context) {
	rows, err := databaseConn.Query("select date from dates")
  if err!= nil {
    log.Fatal(err.Error())
  }
  defer rows.Close()

  var dates []string
  for rows.Next() {
    var date string
    err := rows.Scan(&date)
    if err!= nil {
      log.Fatal(err.Error())
    }
    dates = append(dates, date)
  }

  c.JSON(http.StatusOK, gin.H{"dates": dates})
}

// SetAnonymousToken godoc
// SetAnonymousToken токен для пользователя
// @Summary Токен для пользователя
// @Description Генерация и задание токена для каждого пользователя(случайный uuid)
// @Tags Users
// @Accept json
// @Produce json
// @Success 200
// @Router /enter_site [post]
func SetAnonymousToken(c *gin.Context) {
	c.SetCookie("anonymous_token", helpers.GenerateUUID(), int(time.Now().Add(30 * 24 * time.Hour).Unix()), "/", "localhost", false, true)
	c.JSON(http.StatusOK, nil)
}

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
// @Router /signUp [post]
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
	userUUID := helpers.GenerateUUID()
	_, err = databaseConn.Exec("INSERT INTO users(uuid, phone_number, password) VALUES($1, $2, $3)", userUUID, inputData.Phone, hashedPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot create user"})
    c.Abort()
    return
	}

	// Изменение избранных(задаем избранные пользователю, если были действия)
	cookie, err := c.Cookie("anonymous_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		c.Abort()
		return
	}
	_, err = databaseConn.Exec("UPDATE favorites SET user_uuid = $1 WHERE anonym_uuid = $2", userUUID, cookie)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot update favorites"})
    c.Abort()
    return
	}

	// Токены
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

	c.SetCookie("token_refresh", refreshToken, int(time.Now().Add(30 * 24 * time.Hour).Unix()), "/", "localhost", false, true)

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
// @Router /signIn [post]
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
	row := databaseConn.QueryRow("SELECT uuid, phone_number, password FROM users WHERE phone_number=$1", inputData.Phone)
	if err := row.Scan(&existingUser.UUID, &existingUser.PhoneNumber, &existingUser.Password); err != nil {
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

	// Изменение избранных(задаем избранные пользователю, если были действия)
	cookie, err := c.Cookie("anonymous_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		c.Abort()
		return
	}
	_, err = databaseConn.Exec("UPDATE favorites SET user_uuid = $1 WHERE anonym_uuid = $2", existingUser.UUID, cookie)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot update favorites"})
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

	c.SetCookie("token_refresh", refreshToken, int(time.Now().Add(30 * 24 * time.Hour).Unix()), "/", "localhost", false, true)

	c.JSON(http.StatusCreated, gin.H{"access_token": accessToken})
}