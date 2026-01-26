package models

import (
	"github.com/google/uuid"
)

type Category struct {
	ID   uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name string    `gorm:"not null"`

	Products Product `gorm:"foreignKey:CategoryID"`

	ParentID *uuid.UUID `gorm:"type:uuid"`
	Parent   *Category  `gorm:"foreignKey:ParentID"`
}
