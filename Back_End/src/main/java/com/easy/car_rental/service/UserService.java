package com.easy.car_rental.service;

import com.easy.car_rental.dto.DriverDTO;
import com.easy.car_rental.dto.UserDTO;
import com.easy.car_rental.enums.RoleType;
import com.easy.car_rental.repo.AdminRepo;
import com.easy.car_rental.repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface UserService {
    UserDTO loginUser(RoleType roleType, String userName, String password);
}
