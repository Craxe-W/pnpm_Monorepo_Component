import React, { useState } from 'react'
import { Popup } from 'antd-mobile'

export const ActivityRule = (props:any) => {
  const { 
    visible=false, 
    position='Aline',
    onClick, 
    onClickButton, 
    activityRuleStyleClass='', 
    clickButtonStyleClass='',
    activityRule='', 
    ruleTitle='活动规则', 
    bodyClassName=`mk-activity-rule`, 
    children, 
    ...rest 
  } = props
  return(
    <>
      <div className={`activityRuleStyle-${position} ${activityRuleStyleClass}`} onClick={() => onClick()}>
        活动规则
      </div>
      <Popup
        visible={visible}
        bodyClassName={`${bodyClassName}`}
        {...rest}
      >
        <div className={`${bodyClassName}-title`}>{ruleTitle}</div>
        <div className={`${bodyClassName}-content`}>
          <div>{activityRule && activityRule.split('\n').map((t: string, i: number) => <p key={i}>{t}</p>)}</div>
          <div>{children}</div>
        </div>
        <div
          className={`${bodyClassName}-close ${clickButtonStyleClass}`}
          onClick={() => onClickButton()}
        >
          知道了
        </div>
      </Popup>
    </>
  )
}