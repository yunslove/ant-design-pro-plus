import React from 'react';
import { Badge } from 'antd';
import _find from 'lodash/find';
import _isArray from 'lodash/isArray';
import _partial from 'lodash/partial';

export function getData(action) {
  const { data } = action.payload;
  return data || {};
}

export function getTableList(action) {
  // 本地化更新数据，直接传入数组
  const { payload } = action;
  if (_isArray(payload)) {
    return { list: payload };
  }
  // 请求接口响应数据处理
  const { data } = payload;
  return data.data
    ? {
        list: data.data || [],
        pagination: {
          current: data.current_page,
          pageSize: data.per_page,
          total: data.total,
        },
      }
    : { list: data || [] };
}

export function renderStatus(status, code) {
  if (code) {
    const target = _find(status, { value: code });
    if (!target) return `未编码：${code}`;

    const color = target.status ? { status: target.status } : { color: target.color };
    return <Badge {...color} text={target.text} />;
  }
  return '无状态';
}

export function renderCode(list, code) {
  if (code) {
    const type = _find(list, { value: code });
    if (type) return type.text;
    return `未编码：${code}`;
  }
  return `无类型`;
}

export function isCommitSuccess(response) {
  return !response.status_code;
}

export function isCommitSuccessNew(response) {
  return response.status_code === 200;
}
