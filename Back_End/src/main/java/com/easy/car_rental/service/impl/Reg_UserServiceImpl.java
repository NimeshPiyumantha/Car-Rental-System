package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.Reg_UserDTO;
import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.repo.Reg_UserRepo;
import com.easy.car_rental.service.Reg_UserService;
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
public class Reg_UserServiceImpl implements Reg_UserService {

    @Autowired
    private Reg_UserRepo repo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveUser(Reg_UserDTO dto) {
        if (repo.existsById(dto.getUser_Id())) {
            throw new RuntimeException("User Already Exist. Please enter another id..!");
        }
        repo.save(mapper.map(dto, Reg_User.class));
    }

    @Override
    public void updateUser(Reg_UserDTO dto) {
        if (!repo.existsById(dto.getUser_Id())) {
            throw new RuntimeException("Customer Not Exist. Please enter Valid id..!");
        }
        repo.save(mapper.map(dto, Reg_User.class));
    }

    @Override
    public void deleteUser(String reg_ID) {
        if (!repo.existsById(reg_ID)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(reg_ID);
    }


}
