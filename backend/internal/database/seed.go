package database

import (
	"gorm.io/gorm"

	productModels "github.com/vendrya/markethub/internal/modules/products/models"
)

func Seed(db *gorm.DB) error {
	if err := productModels.SeedCategories(db); err != nil {
		return err
	}

	if err := productModels.SeedTags(db); err != nil {
		return err
	}

	return nil
}
