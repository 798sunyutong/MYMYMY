<template>
  <div class="home">
    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData"
      :merge-cells="mergeCells"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="date20" title="单元类型*" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="date21" title="节点编号" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="name" title="节点名称" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="nickname" title="节点范围与描述" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="num1" title="检查项编号*" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-table-column>
      <vxe-table-column field="date12" title="主要风险" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
      <vxe-table-column field="date13" title="初始风险后果等级" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="date14" title="初始风险发生可能性" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="date15" title="检查项描述*" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="date16" title="保护层类型" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="date17" title="风险降低倍数" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="date18" title="检查依据*" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
      <vxe-table-column field="date19" title="检查项评分" :edit-render="{name: '$input', props: {type: 'week'}}"></vxe-table-column>
    </vxe-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",},
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 'Women', age: 22, address: 'Guangzhou', date12: '', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",},
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",},
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",},
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",},
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",},
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",},
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '',data14:"",data15:"", data16:"",data17:"",data18:"",data19:"",}
      ],
      sexList: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ],
      mergeCells: [
        { row: 1, col: 1, rowspan: 3, colspan: 3 },
        { row: 5, col: 0, rowspan: 2, colspan: 2 }
      ]
    }
  },
  mounted() {
    
  },
  computed: {

  },
  created() {
   
  },
  methods: {
   
  }
}
</script>
<style scoped>

.home{
  width: 100%;
  height: 100%;
}
.spread-host {
  width: 100%;
  height: 800px
}
</style>


