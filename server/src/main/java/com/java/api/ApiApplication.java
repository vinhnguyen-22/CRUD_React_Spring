package com.java.api;

import com.java.api.entity.Book;
import com.java.api.entity.Role;
import com.java.api.entity.User;
import com.java.api.service.IRoleService;
import com.java.api.service.IService;
import com.java.api.utils.ConstantUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ApiApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
	@Autowired
	private IService<User> userService;

	@Autowired
	private IRoleService<Role> roleService;

	@Autowired
	private IService<Book> bookService;


	@Override
	public void run(String... args) throws Exception {
//		if (roleService.findAll().isEmpty()) {
//			roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
//			roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
//		}
//
//		if (userService.findAll().isEmpty()) {
//			User user1 = new User();
//			user1.setEmail("vinhnguyen@user.com");
//			user1.setName("Test User");
//			user1.setMobile("0912345678");
//			user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
		//			user1.setPassword(new BCryptPasswordEncoder().encode("vinhnguyen"));
//			userService.saveOrUpdate(user1);
//
//			User user2 = new User();
//			user2.setEmail("nhanvo@admin.com");
//			user2.setName("Test Admin");
//			user2.setMobile("0909123456");
//			user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
//			user2.setPassword(new BCryptPasswordEncoder().encode("nhanvo"));
//			userService.saveOrUpdate(user2);
//		}

		if (bookService.findAll().isEmpty()) {
			for (int i = 1; i <= 10; i++) {
				Book book = new Book();
				book.setTitle("Spring Microservices in Action " + i);
				book.setAuthor("John Carnell " + i);
				//book.setCoverPhotoURL("https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg");
				book.setCoverPhotoURL("https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg");
				book.setIsbnNumber(1617293989L);
				book.setPrice(2776.00 + i);
				book.setLanguage("English");
				book.setGenre("Technology");
				bookService.saveOrUpdate(book);
			}
		}
	}
}
