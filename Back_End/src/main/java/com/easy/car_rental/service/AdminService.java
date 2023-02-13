package com.easy.car_rental.service;

import com.easy.car_rental.dto.Reg_UserDTO;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface AdminService {
    void saveAdmin(Reg_UserDTO dto);
    void updateAdmin(Reg_UserDTO dto);
    void deleteUser(String reg_ID);

}
