package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Role string

const (
	RoleUser  Role = "USER"
	RoleAdmin Role = "ADMIN"
)

type User struct {
	ID uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`

	FirstName string `gorm:"not null"`
	LastName  string `gorm:"not null"`

	Email string `gorm:"uniqueIndex;not null"`

	Password string `gorm:"not null"`

	Role Role `gorm:"type:varchar(20);default:'USER'"`

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

func (u *User) GetFullName() string {
	return u.FirstName + " " + u.LastName
}
