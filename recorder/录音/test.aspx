<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="WebApplication1.test" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
    
    <audio controls autoplay></audio>
        <input onclick="startRecording()" type="button" value="录音" />
        <input onclick="stopRecording()" type="button" value="停止" />
        <input onclick="playRecording()" type="button" value="播放" />
        <input onclick="uploadAudio()" type="button" value="提交" /><asp:Button 
            ID="Button1" runat="server" onclick="Button1_Click" Text="识别" />
&nbsp;<script type="text/javascript" src="HZRecorder.js"></script><script>

        var recorder;

        var audio = document.querySelector('audio');

        function startRecording() {
            HZRecorder.get(function (rec) {
                recorder = rec;
                recorder.start();
            });
        }

        function stopRecording() {
            recorder.stop();
        }

        function playRecording() {
            recorder.play(audio);
        }

        function uploadAudio() {
            recorder.upload("Handler1.ashx", function (state, e) {
                switch (state) {
                    case 'uploading':
                        //var percentComplete = Math.round(e.loaded * 100 / e.total) + '%';
                        break;
                    case 'ok':
                        //alert(e.target.responseText);
                        alert("上传成功");
                        break;
                    case 'error':
                        alert("上传失败");
                        break;
                    case 'cancel':
                        alert("上传被取消");
                        break;
                }
            });
        }

    </script><br />
        <asp:TextBox ID="TextBox2" runat="server" Height="270px" Width="417px" TextMode="MultiLine"></asp:TextBox>
    </div>

    </form>
</body>
</html>
