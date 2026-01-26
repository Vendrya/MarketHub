package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Category struct {
	ID   uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name string    `gorm:"not null"`

	Products []Product `gorm:"foreignKey:CategoryID"`

	ParentID *uuid.UUID `gorm:"type:uuid"`
	Parent   *Category  `gorm:"foreignKey:ParentID"`
}

func SeedCategories(db *gorm.DB) error {
	categories := []Category{
		{Name: "Electronics"},
		{Name: "Fashion"},
		{Name: "Home & Living"},
		{Name: "Beauty & Personal Care"},
		{Name: "Health & Wellness"},
		{Name: "Sports & Outdoors"},
		{Name: "Toys & Games"},
		{Name: "Books & Stationery"},
		{Name: "Groceries"},
		{Name: "Automotive"},
		{Name: "Pet Supplies"},
		{Name: "Office & Work"},
		{Name: "Baby & Kids"},
		{Name: "Jewelry & Accessories"},
		{Name: "Digital Products"},
	}

	for _, category := range categories {
		if err := db.FirstOrCreate(&category, Category{Name: category.Name}).Error; err != nil {
			return err
		}
	}

	return nil
}
