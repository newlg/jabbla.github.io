/**
 * Created by zxr on 2016/4/27.
 */
var picVarious = function(){
    var dom = createDom('div');
    //根据宽高比计算裁剪位置
    function cutImage(img,dom){
        //公共数据
        var domWidth = parseInt(dom.style.width),
            domHeight= parseInt(dom.style.height);
        //获取宽高比
        var scale = img.width/img.height;
        var scaleDom = domWidth/domHeight;
        //计算水平或者垂直方向上的偏移
        var move;
        if(scaleDom>=scale){
            move = ((domWidth/scale)-domHeight)/2;
            updateStyles(img,{width:'100%',position:'absolute',top:-move+'px'});
        }else{
            move = ((domHeight*scale)-domWidth)/2;
            updateStyles(img,{height:'100%',position:'absolute',left:-move+'px'});
        }
        updateStyles(dom,{overflow:'hidden'});
        //将图像插入dom
        dom.addChilds(img);
    }
    //不同布局的策略方法
    var Layouts = {
        1:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight= parseInt(dom.style.height);
            //创建图像
            var img = createImage(imgs[0]);
            img.addEventListener('load',function(){
                console.log('1');
                cutImage(this,dom);
            },false);

        },
        2:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight= parseInt(dom.style.height);

            //再套一层div再进行旋转
            var oDiv = createDom('div'),
                div1 = createDom('div'),
                div2 = createDom('div');
            //img
            var img1 = createImage(imgs[0]),oImg1 = createDom('div'),
                img2 = createImage(imgs[1]),oImg2 = createDom('div');

            //计算出的数据
            var cosDeg = Math.cos(Math.atan(domWidth/(3*domHeight)));
            var Deg = Math.acos(cosDeg)*(180/Math.PI);
            var rDeg = Math.acos(cosDeg);
            var X = cosDeg*(domWidth/3);
            var Y = Math.sin(rDeg)*(domWidth/3);
            var wH = Y+(domHeight/cosDeg);
            var oTop = Math.sin(rDeg)*domWidth;
            var oLeft = domWidth*Math.tan(rDeg)*Math.sin(rDeg);

            //属性设置
            updateSameProperties([div1,div2],{
                width:domWidth+'px',height:wH+'px',position:'absolute',overflow:'hidden'
            },[{},{top:-Y+'px',left:domWidth+'px'}]);
            updateStyles(oDiv,{
                position:'relative',transformOrigin:'0 0',transform:'rotate('+Deg+'deg)',
                top:-oTop+'px',left:-oLeft+'px'
            });
            updateSameProperties([oImg1,oImg2],{
                width:domWidth+'px',height:domHeight+'px',position:'absolute',overflow:'hidden',
                transform:'rotate('+-Deg+'deg)'
            },[
                {right:X-domWidth+'px',bottom:0,transformOrigin:'bottom left'},
                {left:X-domWidth+'px',top:0,transformOrigin:'right top'}
            ]);
            updateSameProperties([img1,img2],{
                height:'100%',position:'absolute'
            },[{left:-domWidth/4+'px'},{right:-domWidth/4+'px'}]);

            //添加结构
            oImg1.addChilds(img1);
            oImg2.addChilds(img2);
            div1.addChilds(oImg1);
            div2.addChilds(oImg2);
            oDiv.addChilds(div1,div2);
            dom.addChilds(oDiv);
        },
        3:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight= parseInt(dom.style.height);

            //左边宽div
            var divBig = createDom('div'),
                divNarrow = createDom('div'),
                divUp = createDom('div'),
                divDown = createDom('div');

            var div = [];
            div.push(divBig);
            div.push(divUp);
            div.push(divDown);

            //属性设置
            updateStyles(divBig,{
                width:(domWidth-domHeight*0.5)+'px',height:domHeight+'px',float:'left',position:'relative',
                overflow:'hidden'
            });
            updateStyles(divNarrow,{
                width:0.33*domWidth+'px',height:'100%',float:'left'
            });
            updateSameProperties([divUp,divDown],{
                width:domHeight*0.5+'px',height:domHeight*0.5+'px',backgroundColor:'yellow',
                overflow:'hidden',position:'relative'
            });

            //图片
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    console.log('3');
                    cutImage(this,div[index]);
                },false)
            });

            divNarrow.addChilds(divUp,divDown);
            dom.addChilds(divBig,divNarrow);
        },
        4:function(imgs){

            //公用数据部分
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height);

            //左右两大块
            var divRight = createDom('div'),
                divLeft = createDom('div');


            //4个小方块
            var divLup = createDom('div'),
                divLdown = createDom('div'),
                divRup = createDom('div'),
                divRdown = createDom('div');

            var div = [];
            div.push(divLup);
            div.push(divLdown);
            div.push(divRup);
            div.push(divRdown);


            //属性设置
            updateSameProperties([divLeft,divRight],{
                width:domWidth*0.5+'px',height:domHeight+'px',float:'left'
            });
            updateSameProperties([divLup,divLdown,divRup,divRdown],{
                width:domWidth*0.5+'px',height:0.5*domHeight+'px',overflow:'hidden',position:'relative'
            });

            //图片
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    cutImage(this,div[index]);
                },false)
            });

            //添加结构
            divLeft.addChilds(divLup,divLdown);
            divRight.addChilds(divRup,divRdown);
            dom.addChilds(divLeft);
            dom.addChilds(divRight);
        },
        5:function(imgs){
            //公共数据
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height);
            //套子
            var leftTop = createDom('div'),
                leftdoubleBottom = createDom('div'),
                leftCenterBottom = createDom('div'),
                rightTop = createDom('div'),
                rightBottom = createDom('div');
            //布局
            var left = createDom('div'),
                leftBottom = createDom('div'),
                right = createDom('div');

            var div = [];
            div.push(leftTop);
            div.push(leftdoubleBottom);
            div.push(leftCenterBottom);
            div.push(rightTop);
            div.push(rightBottom);

            //属性设置
            updateStyles(left,{
                width:0.67*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(right,{
                width:0.33*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(leftBottom,{
                width:0.67*domWidth+'px',height:0.33*domHeight+'px'
            });
            updateStyles(leftTop,{
                width:0.67*domWidth+'px',height:0.67*domHeight+'px',overflow:'hidden',position:'relative'
            });
            updateSameProperties([leftdoubleBottom,leftCenterBottom],{
                width:0.5*0.67*domWidth+'px',height:0.33*domHeight+'px',float:'left',overflow:'hidden',position:'relative'
            });
            updateStyles(rightTop,{
                width:0.33*domWidth+'px',height:domWidth*0.33+'px',overflow:'hidden',position:'relative'
            });
            updateStyles(rightBottom,{
                width:0.33*domWidth+'px',height:domHeight-(domWidth*0.33)+'px',overflow:'hidden',position:'relative'
            });
            //图片属性
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    cutImage(this,div[index]);
                },false)
            });

            //添加结构
            dom.addChilds(left,right);
            left.addChilds(leftTop,leftBottom);
            right.addChilds(rightTop,rightBottom);
            leftBottom.addChilds(leftdoubleBottom,leftCenterBottom);

        },
        6:function(imgs){
            //公用数据
            var domWidth = parseInt(dom.style.width),
                domHeight = parseInt(dom.style.height);
            //套子
            var leftTop = createDom('div'),
                leftDoubleBottom = createDom('div'),
                leftCenterBottom = createDom('div'),
                RightTop = createDom('div'),
                RightCenter = createDom('div'),
                RightBottom = createDom('div');


            //布局
            var left = createDom('div'),
                right = createDom('div'),
                leftBottom = createDom('div');

            var div = [];
            div.push(leftTop);
            div.push(leftDoubleBottom);
            div.push(leftCenterBottom);
            div.push(RightTop);
            div.push(RightCenter);
            div.push(RightBottom);

            updateStyles(left,{
                width:0.67*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(right,{
                width:0.33*domWidth+'px',height:domHeight+'px',float:'left'
            });
            updateStyles(leftBottom,{
                width:0.67*domWidth+'px',height:0.333*domHeight+'px'
            });

            updateStyles(leftTop,{
                width:0.67*domWidth+'px',height:0.67*domHeight+'px',position:'relative',overflow:'hidden'
            });
            updateSameProperties([leftDoubleBottom,leftCenterBottom],{
                width:0.5*0.67*domWidth+'px',height:0.333*domHeight+'px',position:'relative',overflow:'hidden',float:'left'
            });
            updateSameProperties([RightTop,RightCenter,RightBottom],{
                width:0.333*domWidth+'px',height:0.333*domHeight+'px',position:'relative',overflow:'hidden'
            });

            //图片属性
            imgs.forEach(function(item,index,array){
                var img = createImage(item);
                img.addEventListener('load',function(){
                    cutImage(this,div[index]);
                },false)
            });

            //创建结构
            dom.addChilds(left,right);
            left.addChilds(leftTop,leftBottom);
            right.addChilds(RightTop,RightCenter,RightBottom);
            leftBottom.addChilds(leftDoubleBottom,leftCenterBottom);
        }
    }
    return {
        create:function(obj){
            //设置容器宽高
            updateStyles(dom,{width:obj.WH[0],height:obj.WH[1],position:'relative'});
            Layouts[obj.imgs.length](obj.imgs);
            return dom;
        }
    }
}