import { useSelector } from 'react-redux';
// material ui
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
// elements
import {
  TopCommentersContainer,
  TopCommentersContents,
  TopCommentersBlock,
  TopCommentersText,
  TopCommentersTextBlockContainer,
  TopCommentersName,
  TopCommentersCount
} from './TopCommentersElements';
// images
import topCommenter from '../../images/topCommenters.svg';

const useStyles = makeStyles((theme) => ({
  yellow: {
    color: 'black',
    backgroundColor: '#FFF176'
  }
}))

// Receives the comments array from the store. Then displays top commenters in descending order, if commenters have an equal amount of comments it displays in most recent order.
const TopCommenters = (props) => {
  const comments = useSelector((state) => state.counter.value)
  const classes = useStyles()

  // a helper function to call that takes in a array returns an array with key value pairs for how many times a user has commented
  const getTop3 = (comments) => {
    const commentsMap = new Map()
    // loop through the array provided and create a map with names as the keys and the count as the value
    comments.forEach((comment, i) => {
      if (!commentsMap.has(comment.name)) {
        commentsMap.set(comment.name, 1)
      } else {
        commentsMap.set(comment.name, commentsMap.get(comment.name) + 1)
      }
    })
    // sorting the map by value
    const sortedCommentsMap = new Map(
      [...commentsMap.entries()].sort((a, b) => b[1] - a[1])
    )
    // creating an array out of the sorted map
    const topCommentsArray = Array.from(sortedCommentsMap, ([name, value]) => ({
      name,
      value
    }))
    return topCommentsArray
  };

  // calling the helper function and slicing the array to get the top 3 commenters
  const topCommentsArray = getTop3(comments).slice(0, 3)

  return (
    <TopCommentersContainer>
      <TopCommentersContents>
        <img alt='Top Commenters' width={400} src={topCommenter} />
        <TopCommentersTextBlockContainer>
          {topCommentsArray.map((comment, index) => {
            return (
              <TopCommentersBlock key={index}>
                <Avatar className={classes.yellow}> {comment.name.slice(0, 1).toUpperCase()} </Avatar>
                <TopCommentersText>
                  <TopCommentersName> {comment.name.slice(0, 20)} </TopCommentersName>
                  <TopCommentersCount> Comments: {comment.value}{' '} </TopCommentersCount>
                </TopCommentersText>
              </TopCommentersBlock>
            )
          })}
        </TopCommentersTextBlockContainer>
      </TopCommentersContents>
    </TopCommentersContainer>
  )
};

export default TopCommenters
