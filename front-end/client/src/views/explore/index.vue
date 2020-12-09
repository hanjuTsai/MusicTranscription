<template>
  <el-container class="wrapper">
    <el-header>
      <el-row class="explore-action-bar">
        <el-col :span="1" class="explore-select-time">All</el-col>
        <el-col :span="4" :offset="1">
          <el-select
            v-model="time_range_value"
            placeholder="Select Time Range"
            @change="getAllWorks"
            style="min-width: 190px"
          >
            <el-option
              v-for="each in time_range_options"
              :key="each.value"
              :label="each.label"
              :value="each.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="9">
          <el-input
            placeholder="Filter by Title"
            v-model="title_filter"
            style="min-width: 190px"
          ></el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-input
            placeholder="Filter by Uploader"
            v-model="uploader_filter"
            style="min-width: 190px"
          ></el-input>
        </el-col>
      </el-row>
    </el-header>
    <!-- </el-container>
  <el-container> -->
    <el-row class="explore-piano-portfolio-prefix-container">
      <el-col class="explore-piano-portfolio-prefix"></el-col>
      <el-col :span="8" class="explore-piano-portfolio"
        ><b>Piano Portfolio Sheet</b></el-col
      >
    </el-row>
    <el-row class="explore-piano-portfolio-table-container">
      <el-table :data="public_pdfs" :row-class-name="tableRowClassName" style="max-width: 1300px">
        <el-table-column
          prop="file_id"
          label="No."
          width="160"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="Title"
          width="230"
        ></el-table-column>
        <el-table-column
          prop="uploader"
          label="Uploader"
          width="230"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="420"
        ></el-table-column>
        <el-table-column label="" align="right">
          <template slot-scope="scope">
            <el-button
              @click.native="openPortfolio(scope.$index, scope.row)"
              size="mini"
              circle
            >
              <sheet-icon
                icon="eye"
                size="sm"
                style="position: relative; left: 1px; top: 1px"
              ></sheet-icon>
            </el-button>
            <el-button
              @click.native="downloadPortfolio(scope.$index, scope.row)"
              size="mini"
              circle
            >
              <sheet-icon
                icon="download"
                size="sm"
                style="position: relative; left: 1px; top: 1px"
              ></sheet-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        class="piano-portfolio-paginator"
        layout="prev, pager, next"
        :total="pdfs_len"
        :page-size="10"
        @current-change="piano_portfolio_page_change">
      </el-pagination>
    </el-row>

    <el-row class="explore-separate-piano-prefix-container">
      <el-col class="explore-separate-piano-prefix"></el-col>
      <el-col :span="8" class="explore-separate-piano"
        ><b>Separated Piano Sound</b></el-col
      >
    </el-row>
    <el-row class="explore-separate-piano-table-container">
      <el-table :data="public_sep_piano" :row-class-name="tableRowClassName" style="max-width: 1300px">
        <el-table-column
          prop="file_id"
          label="No."
          width="160"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="Title"
          width="230"
        ></el-table-column>
        <el-table-column
          prop="uploader"
          label="Uploader"
          width="230"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="420"
        ></el-table-column>
        <el-table-column label="" align="right">
          <template slot-scope="scope">
            <el-button
              @click.native="downloadSepPiano(scope.$index, scope.row)"
              size="mini"
              circle
            >
              <sheet-icon
                icon="download"
                size="sm"
                style="position: relative; left: 1px; top: 1px"
              ></sheet-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        class="separate-piano-paginator"
        layout="prev, pager, next"
        :total="sep_piano_len"
        :page-size="10"
        @current-change="separate_piano_page_change">
      </el-pagination>
    </el-row>

    <el-row class="explore-separate-human-prefix-container">
      <el-col class="explore-separate-human-prefix"></el-col>
      <el-col :span="8" class="explore-separate-human"
        ><b>Separate Human Sound</b></el-col
      >
    </el-row>
    <el-row class="explore-separate-human-table-container">
      <el-table :data="public_sep_human" :row-class-name="tableRowClassName" style="max-width: 1300px">
        <el-table-column
          prop="file_id"
          label="No."
          width="160"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="Title"
          width="230"
        ></el-table-column>
        <el-table-column
          prop="uploader"
          label="Uploader"
          width="230"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="420"
        ></el-table-column>
        <el-table-column label="" align="right">
          <template slot-scope="scope">
            <el-button
              @click.native="downloadSepHuman(scope.$index, scope.row)"
              size="mini"
              circle
            >
              <sheet-icon
                icon="download"
                size="sm"
                style="position: relative; left: 1px; top: 1px"
              ></sheet-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        class="separate-human-paginator"
        layout="prev, pager, next"
        :total="sep_human_len"
        :page-size="10"
        @current-change="separate_human_page_change">
      </el-pagination>
    </el-row>
  </el-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Explore',
  created() {
    window.addEventListener('resize', this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  beforeMount() {
    if (!this.isLoginCheck) {
      this.$store.dispatch('auth/CheckLoginStatus');
    } else {
      if (this.isAuthenticated) this.getAllWorks(this.time_range_value);
      else this.$router.push('/');
    }
  },
  data() {
    return {
      time_range_options: [
        { label: 'Last 1 Day', value: '1' },
        { label: 'Last 7 Day', value: '7' },
        { label: 'Last 30 Day', value: '30' },
        { label: 'Unlimited', value: '0' },
      ],
      time_range_value: '7',
      title_filter: '',
      uploader_filter: '',
      public_pdfs_index: 1,
      public_sep_piano_index: 1,
      public_sep_human_index: 1
    };
  },
  computed: {
    ...mapState({
      works: state => state.explore.works,
      isAuthenticated: state => state.auth.isAuthenticated,
      isLoginCheck: state => state.auth.isLoginCheck,
    }),
    public_pdfs() {
      return this.works
              .filter(w => w.pdf_file_path !== '' && w.title.toLowerCase().includes(this.title_filter.trim().toLowerCase())
                                                  && w.uploader.toLowerCase().includes(this.uploader_filter.trim().toLowerCase()))
              .slice(10*(this.public_pdfs_index-1), 10*(this.public_pdfs_index));
    },
    public_sep_piano() {
      return this.works
              .filter(w => w.sep_piano_path !== '' && w.title.toLowerCase().includes(this.title_filter.trim().toLowerCase())
                                                   && w.uploader.toLowerCase().includes(this.uploader_filter.trim().toLowerCase()))
              .slice(10*(this.public_sep_piano_index-1), 10*(this.public_sep_piano_index));
    },
    public_sep_human() {
      return this.works
              .filter(w => w.sep_human_path !== '' && w.title.toLowerCase().includes(this.title_filter.trim().toLowerCase())
                                                   && w.uploader.toLowerCase().includes(this.uploader_filter.trim().toLowerCase()))
              .slice(10*(this.public_sep_human_index-1), 10*(this.public_sep_human_index));
    },
    pdfs_len() {
      return this.works
              .filter(w => w.pdf_file_path !== '' && w.title.toLowerCase().includes(this.title_filter.trim().toLowerCase())
                                                  && w.uploader.toLowerCase().includes(this.uploader_filter.trim().toLowerCase()))
              .length;
    },
    sep_piano_len() {
      return this.works
              .filter(w => w.sep_piano_path !== '' && w.title.toLowerCase().includes(this.title_filter.trim().toLowerCase())
                                                   && w.uploader.toLowerCase().includes(this.uploader_filter.trim().toLowerCase()))
              .length;
    },
    sep_human_len() {
      return this.works
              .filter(w => w.sep_human_path !== '' && w.title.toLowerCase().includes(this.title_filter.trim().toLowerCase())
                                                   && w.uploader.toLowerCase().includes(this.uploader_filter.trim().toLowerCase()))
              .length;
    },
  },
  methods: {
    getAllWorks(range) {
      this.time_range_value = range;
      this.$store.dispatch('explore/getAllWorks', { time_range: range });
    },
    openPortfolio(index, data) {
      this.$store.dispatch('explore/openPortfolio', {
        _id: data._id,
        path: data.pdf_file_path,
      });
    },
    downloadPortfolio(index, data) {
      this.$store.dispatch('explore/downloadPortfolio', {
        _id: data._id,
        path: data.pdf_file_path,
      });
    },
    downloadSepPiano(index, data) {
      this.$store.dispatch('explore/downloadSepPiano', {
        _id: data._id,
        path: data.sep_piano_path,
      });
    },
    downloadSepHuman(index, data) {
      this.$store.dispatch('explore/downloadSepHuman', {
        _id: data._id,
        path: data.sep_human_path,
      });
    },
    resizeHandler() {
      this.windowWidth = window.innerWidth;
    },
    piano_portfolio_page_change(index) {
      this.public_pdfs_index = index;
    },
    separate_piano_page_change(index) {
      this.public_sep_piano_index = index;
    },
    separate_human_page_change(index) {
      this.public_sep_human_index = index;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'second-row';
      }

      return '';
    }
  },
  watch: {
    works: function(works) {
      console.log('Get Works !');
    },
    isLoginCheck: function(isLoginCheck) {
      if (!isLoginCheck) {
        this.$store.dispatch('auth/CheckLoginStatus');
      } else {
        if (this.isAuthenticated) this.getAllWorks(this.time_range_value);
        else this.$router.push('/');
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.wrapper
  padding-bottom: 10px

.explore-action-bar
  will-change padding-left
  transition padding-left 0.5s ease
  margin-top 20px
  width: auto

.explore-select-time
  border-radius 5px
  background-color #494949
  color #ffffff
  text-align center
  min-width: 50px
  line-height 39px
  min-height 39px

.explore-piano-portfolio-prefix-container, .explore-separate-piano-prefix-container, .explore-separate-human-prefix-container
  margin-top: 30px

.explore-piano-portfolio-prefix, .explore-separate-piano-prefix, .explore-separate-human-prefix
  width 10px
  background-color #494949
  min-height 34px

.explore-piano-portfolio, .explore-separate-piano, .explore-separate-human
  margin-left: 10px
  line-height 34px
  font-size 20px

.explore-piano-portfolio-table-container, .explore-separate-piano-table-container, .explore-separate-human-table-container
  margin: 15px 0

.piano-portfolio-paginator, .separate-piano-paginator, .separate-human-paginator
  position: relative
  float: left
  left: 40vw
</style>
<style lang="stylus">
.el-table .second-row
  background-color: #F7F7F7
</style>
