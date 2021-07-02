import { Link } from "react-router-dom"
//import { Table } from 'react-bootstrap'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Notes = ({notes}) => (
  <div>
  <h2>Notes</h2>

  <TableContainer component={Paper}>
    <Table>
      <TableBody>
        {notes.map(note => (
          <TableRow key={note.id}>
            <TableCell>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </TableCell>
            <TableCell>
              {note.user}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>
)

export default Notes