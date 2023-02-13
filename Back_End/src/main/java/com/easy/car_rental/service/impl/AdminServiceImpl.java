package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.Reg_UserDTO;
import com.easy.car_rental.service.AdminService;
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
    @Override
    public void saveAdmin(Reg_UserDTO dto) {

    }

    @Override
    public void updateAdmin(Reg_UserDTO dto) {

    }

    @Override
    public void deleteUser(String reg_ID) {

    }

    @Override
    public ArrayList<Reg_UserDTO> getAllAdmin() {
        return null;
    }
}
