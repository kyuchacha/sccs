package com.sccs.cm.sys.cmmn.services;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

/**
 * 데이터베이스와 연결된 ibatis용 템플릿 객체를 구하기 위해서 SqlMapClientDaoSupport를 상속받는다.
 * 템플릿 객체란 매번 db에 접근해서 작업할때 반복적으로 코딩해야하는 것들을 처리해 놓은 클래스이다. 
 * @author cjlee
 */
@Repository
public abstract class CmAbstractDEM extends EgovAbstractMapper {
	
	/**
	 * @Resource 어노테이션은 jsr250-api.jar를 포함해야 사용할 수 있다.
	 * @Resource나 @Autowired 모두 빈객체를 전달하는 어노테이션이기 때문에 둘중에 하나만 있어도된다.
	 * @Resource어노테이션의 경우 빈객체의 이름과 명시한 파라미터의 이름에 같을 경우 name속을 명시할 필요가 없고 다를 경우는 name을 명시해야함.
	 * @Autowired는 이름을 명시할 수 없다(타입과 한정자를 이용,@Qualifier 어노테이션을 이용해서 이름을 명시할 수 있다.).
	 */
    /*
	@Autowired
	@Resource(name="sqlSessionTemplate")
	public void init(SqlSessionTemplate sqlSessionTemplate)
	{
		setSqlSessionTemplate(sqlSessionTemplate);		
	}
	*/
	
	@Autowired
    @Resource(name = "sqlSessionFactory")
    public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
        super.setSqlSessionFactory(sqlSession);
    }
}