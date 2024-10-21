package models

type SignUpData struct {
	Phone string `json:"phone"`
	Password string `json:"password"`
}

type UserInfo struct {
	UUID string `json:"uuid"`
	PhoneNumber string `json:"phone_number"`
	Password string `json:"password"`
}