package main

import (
	"time"
	"account_service/controllers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "account_service/docs"
	"github.com/swaggo/gin-swagger"
	"github.com/swaggo/files"
)

// @title Account service API
// @version 1.0
// @description Account API on Go documentation

// @host localhost:8081
// @BasePath /api/Accounts
func main() {
	router := gin.Default()
	defer router.Run(":8081")

	// CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://127.0.0.1:3000", "http://0.0.0.0:3000", "http://localhost:3000",
	}
	config.AllowMethods = []string{"POST", "GET", "PUT", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control", "Pragma"}
	config.ExposeHeaders = []string{"Content-Length"}
	config.AllowCredentials = true
	config.MaxAge = 12 * time.Hour
	router.Use(cors.New(config))

	accounts := router.Group("/api/Accounts")

	accounts.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	accounts.POST("/enter_site", controllers.SetAnonymousToken)
	accounts.POST("/signUp", controllers.SignUp)
	accounts.POST("/signIn", controllers.SignIn)
}