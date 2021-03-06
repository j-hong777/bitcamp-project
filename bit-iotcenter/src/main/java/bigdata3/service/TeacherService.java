package bigdata3.service;

import java.util.List;

import bigdata3.domain.Teacher;

public interface TeacherService {
  List<Teacher> list(int pageNo, int pageSize) throws Exception;
  Teacher get(int no) throws Exception;
  Teacher getByEmailPassword(String email, String password) throws Exception;
  Teacher getByEmailTel(String email, String tel) throws Exception;
  void add(Teacher teacher) throws Exception;
  void update(Teacher teacher) throws Exception;
  void remove(int no) throws Exception;
}







