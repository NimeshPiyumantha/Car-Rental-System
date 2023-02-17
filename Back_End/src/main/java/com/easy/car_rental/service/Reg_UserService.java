package com.easy.car_rental.service;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.Reg_UserDTO;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface Reg_UserService {
    void saveUser(Reg_UserDTO dto);

    void updateUser(Reg_UserDTO dto);

    void deleteUser(String reg_ID);

    ArrayList<Reg_UserDTO> getAllUser();

    CustomDTO userIdGenerate();
}