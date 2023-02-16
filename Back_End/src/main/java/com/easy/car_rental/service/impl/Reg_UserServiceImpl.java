package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.Reg_UserDTO;
import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.entity.User;
import com.easy.car_rental.repo.Reg_UserRepo;
import com.easy.car_rental.service.Reg_UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public void saveUser(Reg_UserDTO dto) throws IOException {

        Reg_User regUser = new Reg_User(dto.getUser_Id(), dto.getName(), dto.getContact_No(), dto.getAddress(),dto.getEmail(),dto.getNic(),dto.getLicense_No(),"","",new User(dto.getUserDTO().getUser_Id(),dto.getUserDTO().getRole_Type(), dto.getUserDTO().getUser_Name(),dto.getUserDTO().getPassword()));

        System.out.println(regUser);

        byte[] bytes = dto.getLicense_Img().getBytes();
        byte[] bytes2 = dto.getNic_Img().getBytes();

        Path location = Paths.get("D:\\IJSE\\IJSE_Project\\Car-Rental-System\\Front_End\\assets\\img\\writeFile\\image.jpeg");

        Files.write(location,bytes);
        Files.write(location,bytes2);

        dto.getLicense_Img().transferTo(location);
        dto.getNic_Img().transferTo(location);

        regUser.setLicense_Img(location.toString());
        regUser.setNic_Img(location.toString());
        System.out.println(regUser);
        if (repo.existsById(dto.getUser_Id())) {
            throw new RuntimeException("User Already Exist. Please enter another id..!");
        }
        repo.save(regUser);
    }

    @Override
    public void updateUser(Reg_UserDTO dto) {
        if (!repo.existsById(dto.getUser_Id())) {
            throw new RuntimeException("User Not Exist. Please enter Valid id..!");
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

    @Override
    public ArrayList<Reg_UserDTO> getAllUser() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Reg_User>>() {
        }.getType());
    }

    @Override
    public CustomDTO userIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

}
