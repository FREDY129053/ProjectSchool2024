package models

import "github.com/dgrijalva/jwt-go"

type Claims struct {
	PhoneNumber string `json:"phone_number"`
	jwt.StandardClaims
}

type TokenResponse struct {
	AccessToken  string `json:"access_token"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}