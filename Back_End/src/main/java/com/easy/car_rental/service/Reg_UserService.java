package com.easy.car_rental.service;

import com.easy.car_rental.dto.Reg_UserDTO;
import org.springframework.web.bind.annotation.ModelAttribute;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface Reg_UserService {
    void saveUser(@ModelAttribute Reg_UserDTO dto);
}