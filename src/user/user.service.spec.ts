import { Test } from '@nestjs/testing'
import { Integration } from '../integration/integration.entity';
import { Admin } from '../auth/admin.entity';
import { UserStatus } from './user-status.enum';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

const mockUserRepository = () => ({
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUserStatus: jest.fn(),
});

const mockIntegration = new Integration();
mockIntegration.id = 1234;

const mockAdmin = new Admin();
mockAdmin.id = 123;
mockAdmin.username = 'SomeUsername';
mockAdmin.password = 'SomePassword';
mockAdmin.hash = 'SomeHash';
mockAdmin.integration = mockIntegration;

const mockUser = {
  id: 'SomeId',
  name: 'SomeName',
  email: 'SomeEmail',
  password: 'SomePassword',
  status: UserStatus.ACTIVED,
  hash: 'SomeHash',
  userProfiles: []
};

describe('UserService', () => {
  let userService: UserService;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository }
      ],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(UserRepository);
  });

  describe('getUsers', () => {
    it('calls UserRepository.getUsers and returns the result', async () => {
      userRepository.getUsers.mockResolvedValue('someValue');
      const result = await userService.getUsers(null, mockAdmin);
      expect(result).toEqual('someValue');
    });
  });

  describe('getUserById', () => {
    it('calls UserRepository.findOne and returns the result', async () => {
      userRepository.getUserById.mockResolvedValue(mockUser);

      const result = await userService.getUserById(123456, mockAdmin);
      expect(result).toEqual(mockUser);
    });

    it('calls UserRepository.findOne and handles an error', async () => {
      userRepository.getUserById.mockResolvedValue(null);
      expect(userService.getUserById(123, mockAdmin)).rejects.toThrow(new NotFoundException(`User with ID 123 not found`));
    });
  });

  describe('createUser', () => {
    it('calls UserRepository.createUser and returns the result', async () => {
      userRepository.createUser.mockResolvedValue(mockUser);
      const mockDto = {
        name: 'SomeName',
        email: 'SomeEmail',
        password: 'SomePassword',
        profileId: 1
      };

      const result = await userService.createUser(mockDto, mockAdmin);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUserStatus', () => {
    it('calls UserService.updateUserStatus and returns the result', async () => {
      let mockId = 123456;
      let updatedUser = mockUser;
      updatedUser.status = UserStatus.BLOCKED;

      userRepository.getUserById.mockResolvedValue(mockUser);
      userRepository.updateUserStatus.mockResolvedValue(updatedUser);

      const result = await userService.updateUserStatus(mockId, UserStatus.BLOCKED, mockAdmin);
      expect(userRepository.getUserById).toHaveBeenCalledWith(mockId, mockAdmin.integration.id);
      expect(result).toEqual(updatedUser);
    });
  });
});