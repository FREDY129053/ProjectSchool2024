package helpers

import (
	"account_service/models"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Перечесление типов
type TokenType int

const (
	AccessToken TokenType = iota
	RefreshToken
)

var (
	accessTokenTime = 30 * time.Minute
	refreshTokenTime = 30 * 24 * time.Hour
)

// Template Method - паттерн
func GenerateToken(phone string, tokenType TokenType, secretKey []byte) (string, error) {
	var expiry time.Duration

	switch tokenType {
		case AccessToken:
      expiry = accessTokenTime
    case RefreshToken:
      expiry = refreshTokenTime
    default:
      panic("Invalid token type")
	}

	claims := &models.Claims{
		PhoneNumber: phone,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(expiry).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(secretKey)
}