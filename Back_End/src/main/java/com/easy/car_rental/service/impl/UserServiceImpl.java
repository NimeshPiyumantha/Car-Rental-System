package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.entity.User;
import com.easy.car_rental.enums.RoleType;
import com.easy.car_rental.exceptions.NotFoundException;
import com.easy.car_rental.repo.UserRepo;
import com.easy.car_rental.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public UserDTO loginUser(RoleType roleType, String userName, String password) {
      User user = repo.findUserName(userName);
        System.out.println(user);

        if (user == null) {
            throw new NotFoundException("User not found");
        }
        return mapper.map(user,UserDTO.class);
    }
}
