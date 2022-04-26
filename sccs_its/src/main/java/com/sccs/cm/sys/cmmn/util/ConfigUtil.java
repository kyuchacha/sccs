package com.sccs.cm.sys.cmmn.util;

import java.net.URL;
import java.util.List;
import java.util.Properties;

import org.apache.commons.configuration.CompositeConfiguration;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.ConfigurationFactory;
import org.apache.commons.configuration.FileConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;

/**
 * /egovframework/system-configuration.xml 에 설정된 내용을 읽어온다.
 * @author cjlee
 */
public class ConfigUtil {
	
	/**
	 * Configuration
	 */
	private static Configuration m_config;

	/**
	 * system-configuration.xml 위치
	 */
	private static final String CONFIG_FILENAME = "/egovframework/system-configuration.xml";

	/**
	 * 초기화처리
	 * @throws RuntimeException
	 */
	public static void initialize() throws RuntimeException {
		loadConfiguration();
	}

	/**
	 * config 파일정보를 로드한다.
	 */
	public static void loadConfiguration() throws RuntimeException {

        try {
        	ConfigurationFactory factory = new ConfigurationFactory();

        	URL url = ConfigUtil.class.getResource(CONFIG_FILENAME);
        	if (url != null) {
        		factory.setConfigurationURL(url);
        	} else {
        		factory.setConfigurationFileName(CONFIG_FILENAME);
        	}
        	m_config = factory.getConfiguration();
        	setReload(m_config);
        } catch(ConfigurationException e) {
        	throw new RuntimeException("Config Util Error!!!!!!!!!!!");
        }
	}

	/**
	 * @param config The config to set.
	 */
	public void setConfig(Configuration config) {
		m_config = config;
	}

	/**
	 *
	 * config 파일에 매핑되어 있는 value 값을 얻어온다
	 *
	 * @param param	property 에 정의된 key.
	 *
	 * @return	String property 에 정의된 key 에 매핑되어 있는 value 를 얻어온다.
	 *
	 */
	public static String getString(String param) {

		if(m_config == null)
		{
			initialize();
		}
		return m_config.getString(param);
	}

	public static int getInt(String param){

		if(m_config == null)
		{
			initialize();
		}
		return m_config.getInt(param);
	}

	public static String[] getStringArray(String param) {

		if(m_config == null)
		{
			initialize();
		}
		return m_config.getStringArray(param);
	}

	public static Properties getProperties(String param) {

		if(m_config == null)
		{
			initialize();
		}
		return m_config.getProperties(param);
	}

	public static List getList(String param){

		if(m_config == null)
		{
			initialize();
		}
		return m_config.getList(param);
	}

	private static void setReload(Configuration config)
	{
		if (config instanceof  CompositeConfiguration)
		{
			CompositeConfiguration cc = (CompositeConfiguration)config;
			for (int i=0; i < cc.getNumberOfConfigurations(); i++)
			{
				if (cc.getConfiguration(i) instanceof FileConfiguration)
				{
					((FileConfiguration)cc.getConfiguration(i)).setReloadingStrategy(new FileChangedReloadingStrategy());
				}
			}
		}
	}
}
