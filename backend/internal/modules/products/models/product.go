package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Status string

const (
	StatusActive Status = "ACTIVE"
	StatusPaused Status = "PAUSED"
	StatusSold   Status = "SOLD"
)

type Product struct {
	ID          uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Title       string    `gorm:"not null"`
	Description string    `gorm:"type:text;"`
	Price       float64   `gorm:"not null"`
	Status      Status    `gorm:"type:varchar(20);default:'ACTIVE'"`

	CategoryID uuid.UUID `json:"-" gorm:"type:uuid;not null"`
	Category   *Category

	UserID uuid.UUID `json:"-" gorm:"type:uuid;not null"`

	Tags []Tag `gorm:"many2many:product_tags"`

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
