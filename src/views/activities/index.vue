<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="活动Id"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- <el-select
        v-model="listQuery.role"
        placeholder="Role"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in roleOptions" :key="item.key" :label="item.key" :value="item.key" />
      </el-select>
      <el-select
        v-model="listQuery.permission"
        placeholder="权限"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in permissionOptions"
          :key="item.key"
          :label="item.key"
          :value="item.key"
        />
      </el-select>-->
      <!-- <el-select
        v-model="listQuery.importance"
        placeholder="Imp"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>-->
      <!-- <el-select
        v-model="listQuery.type"
        placeholder="Type"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>-->
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>-->
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >Export</el-button>-->
      <!-- <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        reviewer
      </el-checkbox>-->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动" width="200" align="center">
        <template slot-scope="{ row }">{{ row.title }}</template>
      </el-table-column>
      <el-table-column label="链接" width="200" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-clipboard:copy="$activityDomain + 'activity/' + row.id"
            v-clipboard:success="clipboardSuccess"
            type="primary"
            icon="el-icon-document"
          >复制</el-button>
        </template>
      </el-table-column>
      <el-table-column label="报名费" align="center">
        <template slot-scope="{ row }">{{ row.signing_up_fee }}</template>
      </el-table-column>
      <el-table-column label="介绍" width="200" align="center">
        <template slot-scope="{ row }">{{ row.description }}</template>
      </el-table-column>
      <el-table-column label="车牌前缀" width="200" align="center">
        <template slot-scope="{ row }">{{ row.prefix }}</template>
      </el-table-column>
      <el-table-column label="分享后得券" width="200" align="center">
        <template slot-scope="{ row }">{{ row.share_mode ? "给" : "不给" }}</template>
      </el-table-column>
      <el-table-column label="多级返利" width="200" align="center">
        <template slot-scope="{ row }">
          <div>1级返利:{{ row.return_profit_rate.level1 }}</div>
          <div>2级返利:{{ row.return_profit_rate.level2 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="团长返利" width="200" align="center">
        <template slot-scope="{ row }">{{ row.return_profit_rate.leader }}</template>
      </el-table-column>
      <el-table-column label="主办方" width="200" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.shop }}</div>
          <div>{{ row.tel }}</div>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="200" align="center">
        <template slot-scope="{ row }">{{ row.address }}</template>
      </el-table-column>
      <el-table-column label="活动举办时间" width="200" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.start_at }}</div>
          <div>到</div>
          <div>{{ row.end_at }}</div>
        </template>
      </el-table-column>
      <el-table-column label="报名时间" width="200" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.start_signing_up_at }}</div>
          <div>到</div>
          <div>{{ row.end_at }}</div>
        </template>
      </el-table-column>

      <el-table-column label="优惠券有效期" width="200" align="center">
        <template slot-scope="{ row }">
          <div>{{ row.allow_to_use_at }}</div>
          <div>到</div>
          <div>{{ row.expire_at }}</div>
        </template>
      </el-table-column>

      <el-table-column label="参与者" width="140" align="center">
        <template slot-scope="{ row }">
          <router-link :to="{ path: '/participants', query: { activity: row.id, coupon: true } }">
            <div>购买人数: {{ row.coupons_count }}</div>
          </router-link>
          <router-link :to="{ path: '/participants', query: { activity: row.id } }">
            <div>关注人数: {{ row.participants_count }}</div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="虚拟人数" width="140" align="center">
        <template slot-scope="{ row }">
          <div>购买人数: +{{ row.offset.coupons }}</div>
          <div>关注人数: +{{ row.offset.participants }}</div>
        </template>
      </el-table-column>
      <el-table-column label="返利模式" align="center">
        <template slot-scope="{ row }">{{ row.return_mode }}</template>
      </el-table-column>
      <el-table-column label="限制车牌" align="center" width="200">
        <template slot-scope="{ row }">
          <div
            v-for="(license_plate_number, i) in row.restricted_license_plate_numbers"
            :key="i"
            style="margin-bottom:2px"
          >
            {{ license_plate_number }}
            <el-button
              size="mini"
              type="danger"
              @click="removeRestrictedLicensePlateNumber(row, i)"
            >移出</el-button>
          </div>
          <el-button type="primary" size="mini" @click="addRestrictedLicensePlateNumber(row)">添加</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="海报" align="center" width="120px">
        <template slot-scope="{ row }">
          <el-image
            v-if="row.poster"
            style="width: 60px; height: 120px"
            :src="$backend + row.poster"
            fit="fit"
            :preview-src-list="[$backend + row.poster]"
          />
        </template>
      </el-table-column>
      <el-table-column label="宣传图" align="center">
        <template slot-scope="{ row }">
          <el-image
            v-for="(image, i) in row.propaganda_images"
            :key="i"
            :src="$backend + image"
            style="width: 30px; height: 30px"
            fit="fit"
            :preview-src-list="[$backend + image]"
          />
        </template>
      </el-table-column>
      <el-table-column label="宣传视频" width="420px" align="center">
        <template slot-scope="{ row }">
          <span v-if="row.video">
            <video
              preload="auto"
              width="380px"
              controls="controls"
              x5-video-player-fullscreen="false"
              x5-playsinline
              playsinline
              webkit-playsinline="true"
              :poster="$backend + row.video_thumbnail"
            >
              <source :src="$backend + row.video" type="video/mp4" />
            </video>
          </span>
        </template>
      </el-table-column>-->

      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{ row, $index }">
          <div style="margin-bottom:5px">
            <el-button type="primary" size="mini" @click="handleUpdate(row, $index)">编辑</el-button>
          </div>
          <div>
            <template>
              <el-popconfirm
                title="Are you sure to delete this?"
                @onConfirm="handleDelete(row, $index)"
              >
                <el-button
                  v-if="row.status != 'deleted'"
                  slot="reference"
                  size="mini"
                  type="danger"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </div>

          <!-- <el-button
            v-if="row.status != 'published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 'published')"
          >
            Publish
          </el-button>
          <el-button
            v-if="row.status != 'draft'"
            size="mini"
            @click="handleModifyStatus(row, 'draft')"
          >
            Draft
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            Delete
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label-width="auto" label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label-width="auto" label="介绍" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item label-width="auto" label="报名费" prop="signing_up_fee">
          <el-input v-model.trim="temp.signing_up_fee" />
        </el-form-item>
        <el-form-item label-width="auto" label="地点" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label-width="auto" label="定位" prop="location">
          <el-input v-model.trim="temp.location.longitude" />
          <el-input v-model.trim="temp.location.latitude" />
        </el-form-item>
        <el-form-item label-width="auto" label="门店" prop="shop">
          <el-input v-model="temp.shop" />
        </el-form-item>
        <el-form-item label-width="auto" label="1级返利" prop="shop">
          <el-input v-model.trim="temp.return_profit_rate.level1" />
        </el-form-item>
        <el-form-item label-width="auto" label="2级返利" prop="shop">
          <el-input v-model.trim="temp.return_profit_rate.level2" />
        </el-form-item>
        <el-form-item label-width="auto" label="团长返利" prop="shop">
          <el-input v-model.trim="temp.return_profit_rate.leader" />
        </el-form-item>
        <el-form-item label-width="auto" label="分享后给券" prop="shop">
          <!-- <el-input v-model="temp.share_mode" /> -->
          <el-switch v-model="temp.share_mode" />
        </el-form-item>
        <el-form-item label-width="auto" label="车牌前缀" prop="shop">
          <el-input v-model="temp.prefix" />
        </el-form-item>
        <el-form-item label-width="auto" label="主办方电话" prop="tel">
          <el-input v-model="temp.tel" />
        </el-form-item>

        <el-form-item label-width="auto" label="开始报名时间" prop="end_at">
          <el-date-picker
            v-model="temp.start_signing_up_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>

        <el-form-item label-width="auto" label="报名截止时间" prop="end_at">
          <el-date-picker
            v-model="temp.end_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>

        <el-form-item label-width="auto" label="活动举办时间" prop="end_at">
          <el-date-picker
            v-model="temp.start_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
        <el-form-item label-width="auto" label="活动结束时间" prop="end_at">
          <el-date-picker
            v-model="temp.end_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>

        <el-form-item label-width="auto" label="核销开始时间" prop="allow_to_use_at">
          <el-date-picker
            v-model="temp.allow_to_use_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>

        <el-form-item label-width="auto" label="优惠券失效于" prop="expire_at">
          <el-date-picker
            v-model="temp.expire_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
        <el-form-item label-width="auto" label="虚拟人数" prop="location">
          <el-input v-model.number.trim="temp.offset.coupons" />
          <el-input v-model.number.trim="temp.offset.participants" />
        </el-form-item>

        <el-form-item label="返利模式">
          <el-radio-group v-model="temp.return_mode">
            <el-radio label="nothing">无</el-radio>
            <el-radio label="2level">二级</el-radio>
            <el-radio label="leader">团长</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label-width="auto" label="视频封面" prop="video_thumbnail">
          <el-input v-model="temp.video_thumbnail" />
          <el-image style="width: 200px" :src="$backend + temp.video_thumbnail" fit="fit" />
        </el-form-item>-->

        <!-- <el-form-item label="Role" prop="role">
          <el-select
            v-model="temp.role"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="permission">
          <el-select
            v-model="temp.permission"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in permissionOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >Confirm</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="Type" prop="type">
          <el-select
            v-model="temp.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top: 8px"
          />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>-->

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加车牌" :visible.sync="addRestrictedLicensePlateNumberDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="车牌">
          <el-input v-model.trim="form.licensePlateNumber" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRestrictedLicensePlateNumberDialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="updateRestrictedLicensePlateNumbersData">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, deleteActivity, updateActivity } from '@/api/activities'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import clipboard from '@/directive/clipboard/index.js'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const roleOptions = [
  { key: 'user', display_name: 'user' },
  { key: 'employee', display_name: 'employee' },
  { key: 'leader', display_name: 'leader' }
]

const permissionOptions = [
  { key: 'user', display_name: 'user' },
  { key: 'employee', display_name: 'employee' }
]

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves, clipboard },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        id: undefined,
        role: undefined,
        permission: undefined,
        type: undefined,
        sort: '+id'
      },
      roleOptions,
      permissionOptions,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID 升序', key: '+id' },
        { label: 'ID 降序', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        location: {},
        offset: {},
        return_profit_rate: {}
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false,
      addRestrictedLicensePlateNumberDialogFormVisible: false,
      form: {
        id: undefined,
        licensePlateNumber: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row, index) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp)
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addRestrictedLicensePlateNumber(row, index) {
      this.temp = Object.assign({}, row) // copy obj
      // console.log(this.temp)
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.addRestrictedLicensePlateNumberDialogFormVisible = true
      this.$nextTick(() => {
        // this.$refs['dataForm'].clearValidate()
      })
    },
    updateRestrictedLicensePlateNumbersData() {
      if (this.form.licensePlateNumber) {
        // console.log(this.temp)
        this.temp.restricted_license_plate_numbers.push(this.form.licensePlateNumber)
        const tempData = Object.assign({}, this.temp)
        this.form.licensePlateNumber = ''
        //
        updateActivity(tempData).then(() => {
          const index = this.list.findIndex((v) => v.id === this.temp.id)
          this.list.splice(index, 1, this.temp)
          this.addRestrictedLicensePlateNumberDialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    removeRestrictedLicensePlateNumber(row, index) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.restricted_license_plate_numbers.splice(index, 1)
      const tempData = Object.assign({}, this.temp)

      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      updateActivity(tempData).then(() => {
        const index = this.list.findIndex((v) => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.addRestrictedLicensePlateNumberDialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
      // this.addRestrictedLicensePlateNumberDialogFormVisible = true
      this.$nextTick(() => {
        // this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // console.log(tempData)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          //   const index = this.list.findIndex((v) => v.id === this.temp.id)
          //   this.list.splice(index, 1, this.temp)
          //   this.dialogFormVisible = false
          //   this.$notify({
          //     title: 'Success',
          //     message: 'Update Successfully',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
          updateActivity(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteActivity(row).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        // const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        // const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const tHeader = [
          'id',
          'name',
          'permission',
          'gender',
          'inviter',
          'last_login_at',
          'phone_number',
          'role'
        ]
        const filterVal = [
          'id',
          'name',
          'permission',
          'gender',
          'inviter',
          'last_login_at',
          'phone_number',
          'role'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

