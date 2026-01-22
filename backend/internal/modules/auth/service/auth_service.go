package service

import (
	"errors"

	"github.com/vendrya/markethub/internal/modules/auth/dto"
	"github.com/vendrya/markethub/internal/modules/user/models"
	userRepo "github.com/vendrya/markethub/internal/modules/user/repository"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo   *userRepo.UserRepository
	jwtService *JwtService
}

func NewAuthService(uRepo *userRepo.UserRepository, jwtS *JwtService) *AuthService {
	return &AuthService{
		userRepo:   uRepo,
		jwtService: jwtS,
	}
}

func (s *AuthService) Register(req dto.RegisterRequest) (*dto.AuthResponse, error) {
	existingUser, _ := s.userRepo.FindByEmail(req.Email)
	if existingUser != nil {
		return nil, errors.New("Email already registered")
	}

	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	newUser := &models.User{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  string(hashedPwd),
		Role:      models.RoleUser, // User by default
	}

	if err := s.userRepo.Create(newUser); err != nil {
		return nil, err
	}

	token, err := s.jwtService.GenerateToken(newUser.ID.String(), newUser.Email, string(newUser.Role))
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		Token: token,
		Email: newUser.Email,
		Role:  string(newUser.Role),
	}, nil
}

func (s *AuthService) Login(req dto.LoginRequest) (*dto.AuthResponse, error) {
	user, err := s.userRepo.FindByEmail(req.Email)
	if err != nil || user == nil {
		return nil, errors.New("Invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, errors.New("Invalid credentials")
	}

	token, err := s.jwtService.GenerateToken(user.ID.String(), user.Email, string(user.Role))
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		Token: token,
		Email: user.Email,
		Role:  string(user.Role),
	}, nil
}
