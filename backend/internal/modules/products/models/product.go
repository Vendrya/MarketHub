package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/vendrya/markethub/internal/modules/user/models"
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
	Category   *Category `json:"category,omitempty"`

	UserID uuid.UUID `json:"-" gorm:"type:uuid;not null"`

	Tags []Tag       `gorm:"many2many:product_tags"`
	User models.User `json:"author,omitempty" gorm:"foreignKey:UserID"`

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
