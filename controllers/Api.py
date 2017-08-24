#!/usr/bin/env python
# -*- coding:utf8 -*-
__author__ = 'xiaozhang'



import re
import cgi
import json

from codeigniter import ci
import StringIO
import urllib
import requests
class Api(object):


    _setting={}


    def _kvs(self,kvs):
        header= filter(lambda x:x.strip()!='',map(lambda x:x.strip(), re.split(r'\n',kvs)))
        data={}
        for h in header:
            pos= h.find(":")
            if pos!=-1:
                data[h[0:pos].strip()]=h[pos+1:].strip()
        return data

    def _parse(self,data):
        datas={}
        for d in data.split('&'):
            kvs=d.split('=')
            if len(kvs)==2:
                datas[kvs[0]]=urllib.unquote(kvs[1])
        return datas


    def buildRequest(self,req,resp):
        header=req.params['header']
        body=req.params['body']
        url=req.params['url']
        jscode=req.params.get('jscode','')
        posturl=req.params.get('posturl','')

        request_code='''
import requests
url=\'\'\'%s\'\'\'
header=\'\'\'%s\'\'\'
body=\'\'\'%s\'\'\'
jscode=\'\'\'%s\'\'\'
posturl=\'\'\'%s\'\'\'#js server phantomjs
data={'url':url,'header':header,'body':body,'jscode':jscode,'posturl':posturl}
requests.post('http://127.0.0.1:8005/api/request',data).text

    '''% (url, header,body,jscode,posturl)
        resp.body=request_code


    def request(self,req,resp):

        header=req.params['header']
        body=req.params['body']
        url=req.params['url']
        jscode=req.params.get('jscode','')
        headers= self._kvs(header)

        bodys= self._kvs(body)


        print(req.params)

        if len(bodys)==0:
         bodys=self._parse(body)

        print(bodys)

        if url.strip()=='':
            return 'url is empty'

        content=ci.request(url,data=bodys,headers=headers)

        posturl=req.params.get('posturl','')
        if posturl!='' and jscode!='':
            rd={'page':unicode.encode(content,'utf-8','ignore'),'jscode':jscode,'js':1,'url':'chrome://version/'}
            content=ci.request(posturl,rd)

        resp.body=content

        # print(req.params)

        pass
    def apitool(self,req,resp):
        from urllib import unquote
        from urllib import urlencode
        url=unquote(req.params.pop('_request_uri_'))
        host=req.params.pop('__host')

        header=self._setting.get(host,{})
        header['Content-Type'] = "application/json"
        header['user-agent']='api'

        try:
            if req.method=='GET':
                data=urlencode(req.params)
                return ci.request(host+url+'?'+data,header)
            elif req.method=='POST':
                if '__raw__' in req.params:
                    del req.params['__raw__']
                    header['Content-Type'] = "application/json"
                    return requests.post(host+url,data=json.dumps(req.params),headers=header).json()
                else:
                    return ci.request(host+url,req.params,header)
        except Exception as er:
            return str(er)


    def setting(self,req,resp):
        host=req.params['__host']
        header=req.params['setting']
        self._setting[host]=header

    def test(self,req,resp):
        return req.params


