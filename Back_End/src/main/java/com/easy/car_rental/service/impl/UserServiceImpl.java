package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.repo.Reg_UserRepo;
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
    public ArrayList<UserDTO> getAllRegUsers() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<UserDTO>>() {
        }.getType());
    }

    @Override
    public UserDTO getRegUsers(String username, String password) {
        return mapper.map(repo.findUserByUser_NameAndPassword(username, password), UserDTO.class);
    }
}
