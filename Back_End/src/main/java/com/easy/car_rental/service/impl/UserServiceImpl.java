package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.dto.Reg_UserDTO;
import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.entity.User;
import com.easy.car_rental.enums.RoleType;
import com.easy.car_rental.exceptions.NotFoundException;
import com.easy.car_rental.repo.UserRepo;
import com.easy.car_rental.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

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
    public ArrayList<UserDTO> getLoginDetails(String role, String name, String password) {
        return mapper.map(repo.getLoginUser(role,name,password), new TypeToken<ArrayList<User>>() {
        }.getType());
    }
}
