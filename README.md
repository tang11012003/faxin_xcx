# 子弹发薪 & 子弹CRM 原型仓库

本仓库包含子弹发薪移动端及子弹人力云、子弹CRM相关高保真像素级交互原型 HTML。

## 页面清单

### 1. PC 端登录原型
- **[login.html](login.html)**：子弹人力云 Web 端登录页面原型
  - 对标原站：`https://web.51zidan.com/#/login`
  - 特性：左侧 472px 科技传送带 3D 插画与官方 Logo，右侧 296px 登录表单，图形算术 Canvas 验证码（支持点击换题刷新）、短信发送 60 秒倒计时锁定、官方提取微信圆形矢量图标、微信二维码扫码登录面板平滑切换。
- **[login_crm.html](login_crm.html)**：子弹CRM 快捷登录页面原型
  - 对标原站：`https://yy.51zidan.com/#/login`
  - 特性：全屏 3D 晶体隧道科技质感背景大图与子弹CRM Logo，右侧 530px 快捷登录白底浮动卡片、动态图形算术防伪验证码、复合短信验证码输入框、回车快捷提交支持。

### 2. 移动端发薪原型全闭环
- **[shouye.html](shouye.html)**：移动端首页（项目列表、分类筛选、需打卡/无打卡卡片、快捷邀请扫码海报弹窗）
- **[create_project.html](create_project.html)**：创建项目（需打卡/无打卡双模式动态切换、班次红星、压薪天数与人数封顶）
- **[project_detail.html](project_detail.html)**：项目详情与员工管理（唐宛丽员工信息卡、更多操作、发薪直达）
- **[project_info.html](project_info.html)**：项目设置与基础信息维护
- **[pay_salary.html](pay_salary.html)**：我要发薪（转账人数与金额智能核算、首字母字母表导航、批量勾选调薪与确认发薪）

## 统一交互规范
- **0 Toast**：全页面严格遵守零 Toast 提示约束，表单校验采用内联红框提示，状态流转直接页面跳转或静默更新。
