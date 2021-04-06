/**
 * 中心信息卡 商务信息
 */
import React, {Component} from 'react'
import {Input, Button, Row, Col, DatePicker, Select, message, Spin} from 'antd'
import {Upload, SelectStaff} from '@components'
import moment from 'moment'
import {
    verifyForm,
    addErrorInfo,
    removeErrorInfo,
    handleFieldChange,
    formatUploadStringImg,
    isEmpty,
    omitNumByValue
} from '@utils/utils'
import {editCenterOperatingInfo, centerOperatingInfo} from '@api'
import '../index.less'

const {RangePicker} = DatePicker
const {Option} = Select
const {TextArea} = Input
const dateFormat = 'YYYY-MM-DD'
const INFO_SOURCE = [
    {
        id: 'flop',
        name: '翻牌'
    },
    {
        id: 'network',
        name: '网络'
    },
    {
        id: 'partner',
        name: '合伙人'
    },
    {
        id: 'chain',
        name: '多店'
    }
]
let OPERATING_STATE = [
    {
        id: 'preparing',
        name: '筹备'
    },
    {
        id: 'open',
        name: '营业'
    },
    {
        id: 'to_renew',
        name: '待续'
    },
    {
        id: 'cancel_contract',
        name: '解约'
    },
    {
        id: 'break_contract',
        name: '违约'
    }
]
Input.defaultProps.style = {
    width: '100%'
}
Input.defaultProps.placeholder = '请输入'
Select.defaultProps.style = {
    width: '100%'
}
Select.defaultProps.placeholder = '请选择'
const DEFAULT_COL = {xs: 24, sm: 12, md: 12, lg: 6, xl: 6, xxl: 4}
Col.defaultProps = {
    style: {
        marginBottom: 30
    }
}
const INIT_DATA = () => ({
    form: {
        company_name: '',
        business_license_images: [],
        center_environment_images: [],
        contract_images: [],
        leasing_manager: undefined,
        operating_manager: undefined,
        contract_no: '',
        source: undefined,
        franchise_fee: null,
        operating_state: undefined,
        opening_date: undefined,
        date_range: undefined,
        preparing_date_range: undefined,
        join_policy: ''
    },
    loading: false,
    pending: false,
    errInfo: []
})
const FieldDecorator = {
    company_name: [
        {
            required: true,
            message: '请输入公司名称'
        }
    ],
    leasing_manager: [
        {
            required: true,
            message: '请选择招商经理'
        }
    ],
    source: [
        {
            required: true,
            message: '请选择信息来源'
        }
    ],
    contract_no: [
        {
            required: true,
            message: '请输入合同编号'
        }
    ],
    franchise_fee: [
        {
            type: 'number',
            required: true,
            message: '请输入加盟费'
        }
    ],
    operating_state: [
        {
            required: true,
            message: '请选择运营状态'
        }
    ],
    opening_date: [
        {
            required: true,
            message: '请选择开业日期'
        }
    ],
    operating_manager: [
        {
            required: true,
            message: '请选择运营经理'
        }
    ],
    date_range: [
        {
            required: true,
            message: '请选择起止日期'
        }
    ],
    preparing_date_range: [
        {
            required: true,
            message: '请选择筹备日期'
        }
    ],
    join_policy: [
        {
            required: true,
            message: '请输入加盟政策'
        }
    ],
    business_license_images: [
        {
            type: 'array',
            required: true,
            message: '请上传营业执照'
        }
    ],
    contract_images: [
        {
            type: 'array',
            required: true,
            message: '请上传合同'
        }
    ],
    center_environment_images: [
        {
            type: 'array',
            required: true,
            message: '请上传中心环境照'
        }
    ]
}

class BusinessCard extends Component {
    constructor(props) {
        super(props)
        this.state = INIT_DATA()
    }

    componentDidMount() {
        this.getInfo()
    }

    componentWillUnmount() {
        this.setState({...INIT_DATA()})
    }

    async getInfo() {
        try {
            this.setState({loading: true})
            let params = {
                type: 'business_info'
            }
            let data = await centerOperatingInfo(this.props.centerId, params)
            let {system, business_info} = data.data
            console.log(system, '***********打印 system ***********')
            if (business_info) {
                let franchisee_center_info_system = localStorage.getItem('franchisee_center_info_system')
                if (franchisee_center_info_system) {
                    franchisee_center_info_system = JSON.parse(franchisee_center_info_system)
                    // 如果上一次的会员数是0 这一次有新会员了  重置掉用户填的开业时间 用系统的
                    if (!franchisee_center_info_system.member_count && system.member_count) business_info.opening_date = system.opening_date
                }
                // 如果会员数大于0 并且运营转态为筹备中的 自动变为营业中
                if (system.member_count > 0 && business_info.operating_state === 'preparing') {
                    OPERATING_STATE = OPERATING_STATE.filter(d => d.id !== 'preparing') // 删除筹备
                    business_info.operating_state = 'open'
                }
                console.log(business_info, '***********打印 business_info ***********')
                this.setState({form: business_info})
            }
            localStorage.setItem('franchisee_center_info_system', JSON.stringify(system))
        } catch (e) {
            console.log('****e****', e)
            message.error('获取中心信息失败！')
        }
        this.setState({loading: false})
    }

    async submit() {
        let {form} = this.state
        try {
            await verifyForm(FieldDecorator, form)
            form.business_license_images = form.business_license_images.length
                ? form.business_license_images.map((d) => (d.url ? d.url : d))
                : []
            form.center_environment_images = form.center_environment_images.length
                ? form.center_environment_images.map((d) => (d.url ? d.url : d))
                : []
            form.contract_images = form.contract_images.length
                ? form.contract_images.map((d) => (d.url ? d.url : d))
                : []
            form.opening_date = form.opening_date ? moment(form.opening_date).format('YYYY-MM-DD') : null
            if (form.preparing_date_range) {
                form.preparing_date_range = {
                    begin: moment(form.preparing_date_range.begin).format('YYYY-MM-DD'),
                    end: moment(form.preparing_date_range.end).format('YYYY-MM-DD')
                }
            }
            if (form.date_range) {
                form.date_range = {
                    begin: moment(form.date_range.begin).format('YYYY-MM-DD'),
                    end: moment(form.date_range.end).format('YYYY-MM-DD')
                }
            }
            let json = {
                business_info: form
            }
            this.setState({pending: true})
            await editCenterOperatingInfo(this.props.centerId, json)
            this.setState({pending: false}, () => this.getInfo())
            message.success('保存成功！')
        } catch (errInfo) {
            this.setState({pending: false})
            if (errInfo && errInfo.length) {
                errInfo.map((d) => addErrorInfo(d))
                this.setState({errInfo})
            } else {
                message.error('保存失败！')
            }
        }
    }

    onReset() {
        removeErrorInfo()
    }

    handleChange(type, e) {
        let {errInfo, form} = this.state
        if (type === 'preparing_date_range' || type === 'date_range') {
            form[type] = {
                begin: e[0],
                end: e[1]
            }
            e = 'date' // 标记日期，和数字输入 区分开来
        }
        // 如果是运营和招商经理 需求-变成对象{id: xx,anme: xx} 传后台
        if (type === 'leasing_manager' || type === 'operating_manager') {
            form[type] = {
                id: e.key,
                name: e.label
            }
            e = 'date' // 只要是date,就不赋值
        }
        if (type === 'franchise_fee') {
            let val = e && e.target ? e.target.value : e
            e = omitNumByValue(+val)
        }
        let {_form, info} = handleFieldChange(form, FieldDecorator, type, errInfo, e)
        this.setState({form: _form, errInfo: info})
    }

    render() {
        let {form, pending, loading} = this.state
        let preparingDateRangeBegin = form.preparing_date_range && form.preparing_date_range.begin
            ? moment(form.preparing_date_range.begin, dateFormat)
            : undefined
        let preparingDateRangeEnd = form.preparing_date_range && form.preparing_date_range.end
            ? moment(form.preparing_date_range.end, dateFormat)
            : undefined
        let dateRangeBegin = form.date_range && form.date_range.begin
            ? moment(form.date_range.begin, dateFormat)
            : undefined
        let dateRangeEnd = form.date_range && form.date_range.end ? moment(form.date_range.end, dateFormat) : undefined
        return (
            <div className='form-card center-info_card inline'>
                <Spin spinning={loading}>
                    <Row type={'flex'} align='middle'>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require company_name'>
                                <div className='form-item_name'>公司名称</div>
                                ：
                                <div className='form-item_ct'>
                                    <Input
                                        value={form.company_name}
                                        disabled={pending}
                                        onChange={this.handleChange.bind(this, 'company_name')}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require leasing_manager_id'>
                                <div className='form-item_name'>招商经理</div>
                                ：
                                <div className='form-item_ct'>
                                    <SelectStaff
                                        labelInValue // 可以选择对象 {key: xx,label: xx}
                                        allowClear={false}
                                        type='leasing_manager'
                                        disabled={pending}
                                        value={{
                                            key: form.leasing_manager && form.leasing_manager.id || '',
                                            label: form.leasing_manager && form.leasing_manager.name || ''
                                        }}
                                        onChange={this.handleChange.bind(this, 'leasing_manager')}/>
                                </div>
                            </div>
                        </Col>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require source'>
                                <div className='form-item_name'>信息来源</div>
                                ：
                                <div className='form-item_ct'>
                                    <Select
                                        placeholder='请选择'
                                        allowClear
                                        value={form.source}
                                        disabled={pending}
                                        onChange={this.handleChange.bind(this, 'source')}
                                    >
                                        {INFO_SOURCE.map((d) => (
                                            <Option key={d.id}>{d.name}</Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </Col>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require contract_no'>
                                <div className='form-item_name'>合同编号</div>
                                ：
                                <div className='form-item_ct'>
                                    <Input
                                        value={form.contract_no}
                                        disabled={pending}
                                        onChange={this.handleChange.bind(this, 'contract_no')}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require franchise_fee'>
                                <div className='form-item_name'>加盟费</div>
                                ：
                                <div className='form-item_ct'>
                                    <Input
                                        value={form.franchise_fee}
                                        disabled={pending}
                                        type={'number'}
                                        addonAfter={'元'}
                                        onChange={this.handleChange.bind(this, 'franchise_fee')}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require operating_state' data-name='type'>
                                <div className='form-item_name'>运营状态</div>
                                ：
                                <div className='form-item_ct'>
                                    <Select
                                        placeholder='请选择'
                                        allowClear
                                        value={form.operating_state}
                                        disabled={pending}
                                        onChange={this.handleChange.bind(this, 'operating_state')}
                                    >
                                        {OPERATING_STATE.map((d) => (
                                            <Option key={d.id}>{d.name}</Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </Col>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require open_date'>
                                <div className='form-item_name'>开业日期</div>
                                ：
                                <div className='form-item_ct'>
                                    <DatePicker
                                        value={
                                            !isEmpty(form.opening_date) ? moment(form.opening_date, dateFormat) : undefined
                                        }
                                        onChange={this.handleChange.bind(this, 'opening_date')}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col {...DEFAULT_COL}>
                            <div className='form-item require operating_manager_id'>
                                <div className='form-item_name'>运营经理</div>
                                ：
                                <div className='form-item_ct'>
                                    <SelectStaff
                                        labelInValue // 可以选择对象 {key: xx,label: xx}
                                        allowClear={false}
                                        type='operating_manager'
                                        disabled={pending}
                                        value={{
                                            key: form.operating_manager && form.operating_manager.id || '',
                                            label: form.operating_manager && form.operating_manager.name || ''
                                        }}
                                        onChange={this.handleChange.bind(this, 'operating_manager')}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={5}>
                            <div className='form-item require date_range'>
                                <div className='form-item_name'>起止日期</div>
                                ：
                                <div className='form-item_ct'>
                                    <RangePicker
                                        disabled={pending}
                                        onChange={this.handleChange.bind(this, 'date_range')}
                                        placeholder={['开始日期', '结束日期']}
                                        style={{
                                            width: '100%'
                                        }}
                                        allowClear={false}
                                        value={[dateRangeBegin, dateRangeEnd]}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={5}>
                            <div className='form-item require preparing_date_range'>
                                <div className='form-item_name'>筹备期</div>
                                ：
                                <div className='form-item_ct'>
                                    <RangePicker
                                        disabled={pending}
                                        onChange={this.handleChange.bind(this, 'preparing_date_range')}
                                        placeholder={['开始日期', '结束日期']}
                                        style={{
                                            width: '100%'
                                        }}
                                        allowClear={false}
                                        value={[preparingDateRangeBegin, preparingDateRangeEnd]}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className='form-item top require join_policy'>
                                <div className='form-item_name'>加盟政策</div>
                                ：
                                <div className='form-item_ct'>
                                    <TextArea
                                        rows={4}
                                        placeholder='请输入'
                                        disabled={pending}
                                        value={form.join_policy}
                                        onChange={this.handleChange.bind(this, 'join_policy')}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <div className='form-item top require business_license_images'>
                                <div className='form-item_name'>营业执照</div>
                                ：
                                <div className='form-item_ct'>
                                    <Upload
                                        value={formatUploadStringImg(form.business_license_images)}
                                        onOk={this.handleChange.bind(this, 'business_license_images')}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <div className='form-item top require contract_images'>
                                <div className='form-item_name'>合同扫描</div>
                                ：
                                <div className='form-item_ct'>
                                    <Upload
                                        value={formatUploadStringImg(form.contract_images)}
                                        onOk={this.handleChange.bind(this, 'contract_images')}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                            <div className='form-item top require center_environment_images'>
                                <div className='form-item_name'>中心环境照</div>
                                ：
                                <div className='form-item_ct'>
                                    <Upload
                                        value={formatUploadStringImg(form.center_environment_images)}
                                        onOk={this.handleChange.bind(this, 'center_environment_images')}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className='form-btn'>
                        {/* <Button htmlType='button' onClick={() => this.onReset()}>
                        取消
                    </Button> */}
                        <Button
                            loading={pending}
                            type='primary'
                            htmlType='submit'
                            onClick={() => this.submit()}
                        >
                            保存
                        </Button>
                    </div>
                </Spin>
            </div>
        )
    }
}

export default BusinessCard
