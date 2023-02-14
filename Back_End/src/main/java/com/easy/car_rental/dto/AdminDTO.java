package com.easy.car_rental.dto;

import com.easy.car_rental.embeded.Name;
import enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminDTO {
    private String admin_Id;
    private RoleType role_Type;
    private Name name;
    private String contact_No;
    private String address;
    private String email;
    private String nic;
    private String password;

}
