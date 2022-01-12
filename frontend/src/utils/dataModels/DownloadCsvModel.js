import { Link, Tooltip } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile'

export const file = {
  field: 'file',
  title: '',
  render: () => (
    <div>
      <Tooltip title="Edit">
        <Link style={{ paddingRight: '15px' }}>
          <AttachFileIcon color="action" />
        </Link>
      </Tooltip>
    </div>
  ),
}
export const url = {
  field: 'url',
  title: 'Download Csv',
  render: () => (
    <div>
      <Tooltip title="csv">
        <Link />
      </Tooltip>
    </div>
  ),
}

export const defaultColumns = [file, url]
