const fs = require('fs');

const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>首页-改版</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      background-color: #FAFAFC;
      display: flex;
      justify-content: center;
      min-height: 100vh;
      color: #202536;
    }
    .phone-container {
      width: 375px;
      min-height: 1026px;
      background: #FAFAFC;
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
    }
    /* 背景渐变和背景图 */
    .bg-gradient {
      position: absolute;
      top: 0;
      left: 0;
      width: 375px;
      height: 816px;
      background: linear-gradient(180deg, #EFF2F9 0%, #FAFAFC 100%);
      z-index: 0;
      pointer-events: none;
    }
    .bg-pattern {
      position: absolute;
      top: -77px;
      left: -274px;
      width: 672px;
      height: 317px;
      opacity: 0.5;
      z-index: 1;
      pointer-events: none;
      background-image: url('https://image-resource.mastergo.com/55295699515657/55295699515659/c3329ea3f18f5e6690b0d14ebc8053b0.png');
      background-size: cover;
      background-repeat: no-repeat;
    }

    /* 顶部状态栏 */
    .status-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 375px;
      height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 21px 0 21px;
      z-index: 10;
    }
    .status-time {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      letter-spacing: -0.28px;
    }
    .status-icons {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .status-cellular {
      display: flex;
      align-items: flex-end;
      gap: 1.5px;
      height: 11px;
    }
    .status-cellular span {
      width: 3px;
      background-color: #000;
      border-radius: 1px;
    }
    .status-cellular span:nth-child(1) { height: 4px; }
    .status-cellular span:nth-child(2) { height: 6px; }
    .status-cellular span:nth-child(3) { height: 8px; }
    .status-cellular span:nth-child(4) { height: 11px; }
    .status-wifi {
      width: 15px;
      height: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .status-battery {
      width: 22px;
      height: 11.3px;
      border: 1px solid rgba(0, 0, 0, 0.35);
      border-radius: 2.7px;
      padding: 1px;
      position: relative;
      display: flex;
      align-items: center;
    }
    .status-battery::after {
      content: '';
      position: absolute;
      right: -3px;
      top: 3px;
      width: 1.3px;
      height: 4px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 0 1px 1px 0;
    }
    .battery-level {
      width: 16px;
      height: 7.3px;
      background: #000;
      border-radius: 1.3px;
    }

    /* 顶部 Banner 区域 (组 5559) */
    .banner-container {
      position: absolute;
      top: 71px;
      left: 12px;
      width: 351px;
      height: 275px;
      z-index: 2;
    }
    .banner-bg-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 351px;
      height: 275px;
    }
    .banner-text-1 {
      position: absolute;
      top: 21px;
      left: 18px;
      font-size: 18px;
      font-weight: 900;
      color: #003D54;
      line-height: 16px;
      letter-spacing: 0.5px;
    }
    .banner-text-2 {
      position: absolute;
      top: 44px;
      left: 18px;
      font-size: 18px;
      font-weight: 900;
      color: #003D54;
      line-height: 16px;
      letter-spacing: 0.5px;
    }
    .banner-illustration {
      position: absolute;
      top: -17px;
      right: -4px;
      width: 86px;
      height: 91px;
      pointer-events: none;
    }

    /* 核心入口双卡片 */
    .cards-row {
      position: absolute;
      top: 77px;
      left: 9px;
      width: 333px;
      display: flex;
      justify-content: space-between;
      z-index: 3;
    }
    .entry-card {
      width: 162px;
      height: 115px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    .entry-card.pay {
      background: linear-gradient(180deg, #F0F9F4 5%, rgba(244, 255, 248, 0.75) 100%);
      box-shadow: inset 1px 1px 3px 0px #FFFFFF;
    }
    .entry-card.manage {
      background: linear-gradient(91deg, #CDECD2 1%, #F0FAF4 87%, #D0EFE9 103%);
      box-shadow: inset 1px 1px 3px 0px #FFFFFF;
    }
    .card-title-row {
      display: flex;
      align-items: center;
      margin: 12px 0 0 12px;
      gap: 4px;
    }
    .card-main-title {
      font-size: 13px;
      font-weight: 900;
      color: #202536;
      line-height: 13px;
    }
    .tag-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 11px;
      background: #F9CBB3;
      border-radius: 2px;
      padding: 0 3px;
      font-size: 7px;
      color: #844B2E;
      line-height: 10px;
    }
    .card-subtitle {
      font-size: 10px;
      color: #565868;
      margin: 4px 0 0 12px;
      line-height: 10px;
    }
    .card-btn {
      position: absolute;
      left: 12px;
      top: 51px;
      width: 72px;
      height: 30px;
      background: linear-gradient(270deg, #00A887 0%, #6ED2A6 100%);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }
    .entry-card.manage .card-btn {
      background: linear-gradient(180deg, #00B493 0%, #60E8AD 100%);
    }
    .card-art-pay {
      position: absolute;
      right: 8px;
      top: 25px;
      width: 53px;
      height: 90px;
      pointer-events: none;
    }
    .card-art-manage {
      position: absolute;
      right: 8px;
      top: 25px;
      width: 53px;
      height: 90px;
      pointer-events: none;
    }

    /* 金刚区 (4大功能金刚位) */
    .grid-menu {
      position: absolute;
      top: 212px;
      left: 12px;
      width: 327px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      z-index: 3;
    }
    .grid-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 62px;
      position: relative;
      cursor: pointer;
    }
    .grid-icon-wrap {
      width: 27px;
      height: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }
    .grid-label {
      font-size: 12px;
      color: #202536;
      line-height: 12px;
      text-align: center;
    }
    .grid-badge {
      position: absolute;
      top: 0;
      right: -2px;
      background: #F9CBB3;
      color: #844B2E;
      font-size: 7px;
      padding: 0.5px 3px;
      border-radius: 2px;
      line-height: 10px;
      white-space: nowrap;
    }

    /* 派遣单位选择与筛选行 */
    .company-filter-row {
      position: absolute;
      top: 370px;
      left: 16px;
      width: 343px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 3;
    }
    .company-select {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
    .company-name {
      font-size: 16px;
      font-weight: 600;
      color: #202536;
      line-height: 16px;
    }
    .filter-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: #202536;
      cursor: pointer;
    }

    /* 搜索框 */
    .search-bar {
      position: absolute;
      top: 404px;
      left: 16px;
      width: 344px;
      height: 34px;
      background: #FFFFFF;
      border-radius: 17px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      gap: 6px;
      z-index: 3;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    }
    .search-icon {
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-placeholder {
      font-size: 14px;
      color: #9497B1;
    }

    /* 项目卡片列表 */
    .project-card-list {
      position: absolute;
      top: 457px;
      left: 15px;
      width: 345px;
      z-index: 3;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 100px;
    }
    .project-card {
      width: 345px;
      background: #FFFFFF;
      border-radius: 8px;
      padding: 16px 12px 16px 12px;
      box-shadow: 0 2px 6px rgba(53, 57, 73, 0.03);
      position: relative;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 20px;
      margin-bottom: 12px;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .type-tag {
      height: 20px;
      padding: 0 6px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .type-tag.no-clock {
      background: rgba(0, 214, 121, 0.1);
      color: #00D679;
    }
    .type-tag.need-clock {
      background: rgba(0, 214, 121, 0.1);
      color: #00D679;
    }
    .project-title {
      font-size: 16px;
      font-weight: 600;
      color: #202536;
      line-height: 20px;
    }
    .btn-more {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    /* 项目信息卡片 */
    .project-info-box {
      background: #F4F4F7;
      border-radius: 6px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 10px;
    }
    .info-line {
      font-size: 13px;
      color: #6B6B86;
      line-height: 13px;
    }
    .info-line.highlight {
      color: #202536;
    }

    /* 卡片底部操作按钮组 */
    .card-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
    }
    .action-btn {
      width: 72px;
      height: 32px;
      background: #FAFAFC;
      border: 1px solid #D8D8D8;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      color: #202536;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .action-btn:hover {
      background: #F0FAF4;
      border-color: #00D679;
      color: #00D679;
    }
    .action-btn.primary {
      background: #00D679;
      border-color: #00D679;
      color: #FFFFFF;
    }

    /* 浮动操作菜单 (组 3868) */
    .more-popover {
      position: absolute;
      top: 36px;
      right: 12px;
      width: 97px;
      background: #FFFFFF;
      border-radius: 6px;
      box-shadow: 0px 4px 10px 0px rgba(97, 102, 99, 0.2);
      padding: 10px 0;
      z-index: 10;
      display: none;
    }
    .more-popover.show {
      display: block;
    }
    .popover-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      font-size: 13px;
      color: #202536;
      cursor: pointer;
    }
    .popover-item:hover {
      background: #F4F4F7;
    }

    /* 底部导航栏 (菜单栏) */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      width: 375px;
      height: 83px;
      z-index: 50;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      padding-top: 10px;
      background: #FFFFFF;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    }
    .nav-bg-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 375px;
      height: 83px;
      pointer-events: none;
      z-index: -1;
    }
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      width: 70px;
    }
    .nav-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .nav-text {
      font-size: 10px;
      color: #9497B1;
      line-height: 12px;
    }
    .nav-item.active .nav-text {
      color: #00D679;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="phone-container">
    <!-- 渐变底色与图案 -->
    <div class="bg-gradient"></div>
    <div class="bg-pattern"></div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <div class="status-cellular">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="status-wifi">
          @@SVG:S22#0@@
        </div>
        <div class="status-battery">
          <div class="battery-level"></div>
        </div>
      </div>
    </div>

    <!-- 顶部运营 Banner 区域 -->
    <div class="banner-container">
      <div class="banner-bg-svg">
        @@SVG:S6#0@@
      </div>
      <div class="banner-text-1">考勤记工价</div>
      <div class="banner-text-2">定点打卡 杜绝虚假考勤</div>
      <div class="banner-illustration">
        @@SVG:S7#0@@
        @@SVG:S7#1@@
        @@SVG:S7#2@@
      </div>

      <!-- 核心双卡片 -->
      <div class="cards-row">
        <!-- 一键发薪卡片 -->
        <div class="entry-card pay">
          <div class="card-title-row">
            <span class="card-main-title">一键发薪</span>
            <span class="tag-badge">驻厂适用</span>
          </div>
          <div class="card-subtitle">批量操作秒到账</div>
          <button class="card-btn">创建项目</button>
          <div class="card-art-pay">
            @@SVG:S11#3@@
          </div>
        </div>

        <!-- 去管理卡片 -->
        <div class="entry-card manage">
          <div class="card-title-row">
            <span class="card-main-title">日薪周薪考勤</span>
            <span class="tag-badge">老用户免费体验</span>
          </div>
          <div class="card-subtitle">智能考勤计工价</div>
          <button class="card-btn">去管理</button>
          <div class="card-art-manage">
            @@SVG:S12#2@@
            @@SVG:S12#3@@
            @@SVG:S12#4@@
          </div>
        </div>
      </div>

      <!-- 金刚区 4 大金刚位 -->
      <div class="grid-menu">
        <div class="grid-item">
          <span class="grid-badge">门店适用</span>
          <div class="grid-icon-wrap">
            @@SVG:S13#0@@
          </div>
          <span class="grid-label">极速发薪</span>
        </div>
        <div class="grid-item">
          <div class="grid-icon-wrap">
            @@SVG:S14#0@@
          </div>
          <span class="grid-label">发薪账单</span>
        </div>
        <div class="grid-item">
          <div class="grid-icon-wrap">
            @@SVG:S16#0@@
          </div>
          <span class="grid-label">预支薪资</span>
        </div>
        <div class="grid-item">
          <span class="grid-badge">海量简历</span>
          <div class="grid-icon-wrap">
            @@SVG:S18#0@@
          </div>
          <span class="grid-label">极速招聘</span>
        </div>
      </div>
    </div>

    <!-- 派遣单位选择与筛选行 -->
    <div class="company-filter-row">
      <div class="company-select">
        <span class="company-name">xxx派遣单位名称</span>
        <span style="display: inline-flex; width: 12px; height: 12px;">@@SVG:S19#0@@</span>
      </div>
      <div class="filter-btn">
        <span>筛选</span>
        <span style="display: inline-flex; width: 12px; height: 12px;">@@SVG:S21#0@@</span>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="search-bar">
      <div class="search-icon">
        @@SVG:S20#0@@
      </div>
      <span class="search-placeholder">搜索</span>
    </div>

    <!-- 项目卡片列表 -->
    <div class="project-card-list">
      <!-- 卡片 1: 无打卡 -->
      <div class="project-card">
        <div class="card-header">
          <div class="header-left">
            <span class="type-tag no-clock">无打卡</span>
            <span class="project-title">苏州蓝豚日结工2.28</span>
          </div>
          <div class="btn-more" onclick="togglePopover(event, 'popover-1')">
            @@SVG:S3#0@@
          </div>
        </div>
        <!-- 浮出菜单 -->
        <div class="more-popover" id="popover-1">
          <div class="popover-item">
            <span style="display:inline-flex; width:16px;">@@SVG:S5#1@@</span>
            <span>项目归档</span>
          </div>
          <div class="popover-item">
            <span style="display:inline-flex; width:16px;">@@SVG:S5#2@@</span>
            <span>复制项目</span>
          </div>
        </div>
        <div class="project-info-box">
          <div class="info-line">企业名：西安华为技术有限公司</div>
          <div class="info-line highlight">需报名：23人 &nbsp;&nbsp;&nbsp;&nbsp; 已报名：23人</div>
          <div class="info-line">上班日期：2025-02-28</div>
        </div>
        <div class="card-actions">
          <div class="action-btn">签合同</div>
          <div class="action-btn">去投保</div>
          <div class="action-btn primary">去发薪</div>
          <div class="action-btn">快捷邀请</div>
        </div>
      </div>

      <!-- 卡片 2: 需打卡 -->
      <div class="project-card">
        <div class="card-header">
          <div class="header-left">
            <span class="type-tag need-clock">需打卡</span>
            <span class="project-title">苏州蓝豚日结工2.27</span>
          </div>
          <div class="btn-more" onclick="togglePopover(event, 'popover-2')">
            @@SVG:S4#0@@
          </div>
        </div>
        <!-- 浮出菜单 -->
        <div class="more-popover" id="popover-2">
          <div class="popover-item">
            <span style="display:inline-flex; width:16px;">@@SVG:S5#1@@</span>
            <span>项目归档</span>
          </div>
          <div class="popover-item">
            <span style="display:inline-flex; width:16px;">@@SVG:S5#2@@</span>
            <span>复制项目</span>
          </div>
        </div>
        <div class="project-info-box">
          <div class="info-line">企业名：西安华为技术有限公司</div>
          <div class="info-line highlight">需报名：23人 &nbsp;&nbsp;&nbsp;&nbsp; 已报名：23人 &nbsp;&nbsp; 已打卡：23人</div>
          <div class="info-line">上班日期：2025-01-17</div>
        </div>
        <div class="card-actions">
          <div class="action-btn">签合同</div>
          <div class="action-btn">去投保</div>
          <div class="action-btn primary">去发薪</div>
          <div class="action-btn">快捷邀请</div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <div class="bottom-nav">
      <div class="nav-item active">
        <div class="nav-icon">
          @@SVG:S2#1@@
        </div>
        <span class="nav-text">首页</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon">
          @@SVG:S2#2@@
        </div>
        <span class="nav-text">工作台</span>
      </div>
      <div class="nav-item">
        <div class="nav-icon">
          @@SVG:S2#3@@
        </div>
        <span class="nav-text">我的</span>
      </div>
    </div>
  </div>

  <script>
    function togglePopover(e, id) {
      e.stopPropagation();
      const popover = document.getElementById(id);
      const isShow = popover.classList.contains('show');
      document.querySelectorAll('.more-popover').forEach(p => p.classList.remove('show'));
      if (!isShow) {
        popover.classList.add('show');
      }
    }
    document.addEventListener('click', () => {
      document.querySelectorAll('.more-popover').forEach(p => p.classList.remove('show'));
    });
  </script>
</body>
</html>`;

fs.writeFileSync('d:/Desktop/发薪竞品分析/shouye_template.html', htmlContent, 'utf8');
console.log('Template written successfully!');
