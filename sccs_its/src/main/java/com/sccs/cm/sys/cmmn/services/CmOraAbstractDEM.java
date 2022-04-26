package com.sccs.cm.sys.cmmn.services;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * 오라클DB 접속용 
 * @author cjlee
 */
@Repository
public abstract class CmOraAbstractDEM extends EgovAbstractMapper {
	
	@Autowired
    @Resource(name = "sqlSessionFactoryOra")
    public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
        super.setSqlSessionFactory(sqlSession);
    }
}