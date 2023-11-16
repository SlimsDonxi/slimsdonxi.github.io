using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using WeiPay;
using System.Web.Security;
using System.Web.Script.Serialization;
using System.IO;
using System.Text;
using System.Runtime.Serialization.Json;
using System.Net;

namespace WebApplication1
{
    public partial class test : System.Web.UI.Page
    {
        string API_Key = "xxxxxx";
        string Secret_Key = "xxxxxx";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                TextBox1.Text = GetAccessToken();
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            
            string uid = DateTime.Now.ToString("yyyyMMddHHmmss");
            string returnStr = getStrText(uid, TextBox1.Text, "en", "D:\\1.wav", "wav", "16000");
            TextBox2.Text += returnStr + "\n";
        } 

        public string getStrText(string para_API_id, string para_API_access_token,string para_API_language, string para_API_record,string para_format,string para_Hz)
        {
            //方法参数说明:
            //该方法返回值:
            //该方法执行正确返回值是语音翻译的文本,错误是错误号,可以去看百度语音文档,查看对应错误
             
            string strText = null;
            string error = null;
            FileInfo fi = new FileInfo(para_API_record);
            FileStream fs = new FileStream(para_API_record, FileMode.Open);
            byte[] voice = new byte[fs.Length];
            fs.Read(voice, 0, voice.Length);
            fs.Close();
 
            string getTextUrl = "http://vop.baidu.com/server_api?lan=" + para_API_language + "&cuid=" + para_API_id + "&token=" + para_API_access_token;
            HttpWebRequest getTextRequst = WebRequest.Create(getTextUrl) as HttpWebRequest;
 
           /* getTextRequst.Proxy = null;
            getTextRequst.ServicePoint.Expect100Continue = false;
            getTextRequst.ServicePoint.UseNagleAlgorithm = false;
            getTextRequst.ServicePoint.ConnectionLimit = 65500;
            getTextRequst.AllowWriteStreamBuffering = false;*/
 
            getTextRequst.ContentType = "audio /"+para_format+";rate="+para_Hz;
            getTextRequst.ContentLength = fi.Length;
            getTextRequst.Method = "post";
            getTextRequst.Accept = "*/*";
            getTextRequst.KeepAlive = true;
            //serverreq.UserAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)";
            getTextRequst.Timeout = 30000;//30秒连接不成功就中断 
            using (Stream writeStream = getTextRequst.GetRequestStream())
            {
                writeStream.Write(voice, 0, voice.Length);
            }
            string strJSON = "";
            HttpWebResponse getTextResponse = getTextRequst.GetResponse() as HttpWebResponse;       
            using (StreamReader strHttpText = new StreamReader(getTextResponse.GetResponseStream(), Encoding.UTF8))
            {
                strJSON = strHttpText.ReadToEnd();
            }
            return strJSON;
             
        }



        private string GetAccessToken()
        {
            string url = string.Format("https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id={0}&client_secret={1}", API_Key, Secret_Key);
            string returnStr = HttpUtil.Send("", url);

            Access_Token at = System.Common.JSONConvert.JsonDeserializeBySingleData<Access_Token>(returnStr);
            if (at != null)
            {
                return at.access_token;
            }
            else
            {
                return null;
            }
        }


        

        public class Access_Token
        {
            public string access_token { get; set; }
            public string expires_in { get; set; }
            public string refresh_token { get; set; }
            public string scope { get; set; }
            public string session_key { get; set; }
            public string session_secret { get; set; }
        }

        
    }
}