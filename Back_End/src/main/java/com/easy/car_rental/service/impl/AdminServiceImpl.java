package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.Reg_UserDTO;
import com.easy.car_rental.repo.AdminRepo;
import com.easy.car_rental.repo.Reg_UserRepo;
import com.easy.car_rental.service.AdminService;
import org.modelmapper.ModelMapper;
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
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepo repo;

    @Autowired
    private ModelMapper mapper;

}
