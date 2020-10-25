import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from lxml.html import etree
from pandas.core.frame import DataFrame
import pandas as pd
import json


# options = webdriver.ChromeOptions()
# options.add_argument('-headless')
# driver = webdriver.Chrome()
# driver.implicitly_wait(15)

driver = webdriver.Chrome()
driver.implicitly_wait(15)

# 指定搜索关键词与限定网站
keywords = sys.argv[1]#'sax'
site = sys.argv[2]#'bidchance.com'
pn = sys.argv[3]#'10'
#  需要先不加pn判断页数page
detail_url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=&tn=baidu&bar=&wd=' + keywords + '+site%3A' + site + '&pn=' + pn

# 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=&tn=baidu&bar=&wd=sac+site%3Abidchance.com'
driver.get(detail_url)

# html = driver.page_source
# tree = etree.HTML(html)
# fp = open('E:/智慧工地/lxy/Web13_XinYang/html1.html', 'w', encoding='utf-8')
# fp.write(html)

# 判断有没有第三页
try:
    res = driver.find_element_by_xpath('//div[@id="page"]/div/a[last()-1]/span[2]')
    page = res.text
except:
    page = 1
# print(page)


# 保存标题及url
list = []
try:
    title_list = driver.find_elements_by_xpath("//div[@class='result c-container new-pmd']/h3/a")
    detail_list = driver.find_elements_by_xpath("//div[@class='c-abstract']")
    i = 0 
    for detail in detail_list:
        # print(i, type(i))
        # 保存节点所有源代码
        item = {}
        item["title"] = (title_list[i].text)
        item["link"] = (title_list[i].get_attribute('href'))
        item["detail"] = (detail.text)
        i = i + 1
        list.append(item)
        # detail = etree.tostring(i, pretty_print=True, method='html',).decode("utf-8").encode('utf-8').decode('unicode_escape')
        # detail_lst.append(detail)
except:
    list = []

# 生成二维列表
# list = list(zip(title_lst, detail_lst))
data = {
    "page": page,
    "reslist": list
}
print(json.dumps(data))
driver.quit()
# print(list)

# list1 = [1,2,3,4,4]
# list2 = [2,3,4,5,2]
# z = list(zip(list1,list2))
# z:
# [(1, 2), (2, 3), (3, 4), (4, 5), (4, 2)]
# >>> z[1][1]
# 3
# >>> z[0][1]
# 2
# >>> z[2]
# (3, 4)'''