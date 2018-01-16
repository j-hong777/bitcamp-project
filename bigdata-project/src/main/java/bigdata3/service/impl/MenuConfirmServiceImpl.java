package bigdata3.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bigdata3.dao.MenuConfirmDao;
import bigdata3.domain.MenuConfirm;
import bigdata3.service.MenuConfirmService;

@Service
public class MenuConfirmServiceImpl implements MenuConfirmService {

  @Autowired
  MenuConfirmDao menuConfirmDao;

  @Override
  public List<MenuConfirm> confirmList() {
    return menuConfirmDao.confirmList();
  }

}
