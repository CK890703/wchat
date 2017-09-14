<#import "common/spring.ftl" as s />
<#include 'top.ftl'>
    <aside>
        <div class="menu-tree" id="_hNav" style="margin-top:94px;overflow:auto;height:85%;">
            <div class="inner">
                <#--<#if menuItemList?? && menuItemList?size gt 0 >
                    <#list menuItemList as items>
                        <a id="menu${items.moduleId}" class="menu" href="javascript:void(0);" onclick="gotoMenuUrl(this, '<@s.url '${items.linkUrl}'/>')">
                            <span class="currentline"></span>
                            <i class="ico ${items.icon}"></i>
                            <p>${items.moduleName}</p>
                        </a>
                    </#list>
                </#if>-->
                <#if menuItemList?? && menuItemList?size gt 0>
                    <#list menuItemList as items>
                        <#if items??>
                            <#if items.navs?? && items.navs?size gt 0>
                                <a id="menu${items.moduleId}" class="menu" href="javascript:void(0);" onclick="displaySonMenu(this)">
                                    <span class="currentline"></span>
                                    <i class="ico ${items.icon}"></i>
                                    <p>${items.moduleName}</p>
                                </a>
                                <dl style="display: none">
                                    <#list items.navs as sonitem>
                                        <dd>
                                            <a id="childmenu${sonitem.moduleId}" class="childmenu" href="javascript:void(0);" onclick="gotoSonMenuUrl(this, '<@s.url '${sonitem.linkUrl}'/>')">
                                                <p>${sonitem.moduleName}</p>
                                            </a>
                                        </dd>
                                    </#list>
                                </dl>
                            <#else>
                                <a id="menu${items.moduleId}" class="menu" href="javascript:void(0);" onclick="gotoMenuUrl(this, '<@s.url '${items.linkUrl}'/>')">
                                    <span class="currentline"></span>
                                    <i class="ico ${items.icon}"></i>
                                    <p>${items.moduleName}</p>
                                </a>
                            </#if>
                        </#if>
                    </#list>
                </#if>
            </div>
        </div>
    </aside>
    <div class="main" id="main" style="height:93%">
        <div class="side clearfix" style="width:56px;height:100px;float:left;"></div>
        <div style="height: 100%; margin-left: 100px;" ng-controller="mainController" id="mainController">
            <#if page??>
                <#include '${page}.ftl'>
            </#if>
            <#if url??>
                <iframe src='${url}' frameborder='0' scrolling='auto' width='100%' height='99%'></iframe>
            </#if>
        </div>
    </div>
</div>
<#include 'bottom.ftl'>
