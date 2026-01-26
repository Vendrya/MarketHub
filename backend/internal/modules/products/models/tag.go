package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Tag struct {
	ID   uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name string    `gorm:"not null"`

	Products []Product `gorm:"many2many:product_tags"`
}

func SeedTags(db *gorm.DB) error {
	tags := []Tag{
		{Name: "New Arrival"},
		{Name: "Best Seller"},
		{Name: "On Sale"},
		{Name: "Limited Edition"},
		{Name: "Featured"},
		{Name: "Trending"},
		{Name: "Eco Friendly"},
		{Name: "Handmade"},
		{Name: "Premium Quality"},
		{Name: "Budget Friendly"},
		{Name: "Top Rated"},
		{Name: "Fast Shipping"},
		{Name: "Exclusive"},
		{Name: "Gift Idea"},
		{Name: "Digital Download"},
	}

	for _, tag := range tags {
		if err := db.FirstOrCreate(&tag, Tag{Name: tag.Name}).Error; err != nil {
			return err
		}
	}

	return nil
}
