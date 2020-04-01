import projects from '../lib/projects-content.json'
import { find } from 'lodash'
import {
  BaseStyles,
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  Link,
  Text
} from 'theme-ui'
import { GitHub, ExternalLink } from 'react-feather'
import Player from 'react-player'

export default ({ actions, id, project }) => {
  const {
    video,
    image,
    url,
    name,
    desc,
    creators,
    devpost,
    content = ''
  } = find(projects, { id })
  const thumbnail =
    image?.toLowerCase().endsWith('medium.png') ||
    image?.toLowerCase().endsWith('medium.jpg')
  return (
    <Box
      as="article"
      sx={{
        bg: 'elevated',
        borderRadius: [0, 'extra'],
        position: 'relative'
      }}
    >
      <Box
        as="header"
        sx={{
          bg: 'primary',
          color: 'white',
          py: [3, 4],
          px: [3, 4, 5],
          borderTopLeftRadius: [0, 'extra'],
          borderTopRightRadius: [0, 'extra'],
          position: '-webkit-sticky',
          position: 'sticky',
          top: 0,
          zIndex: 4,
          a: { color: 'white' }
        }}
      >
        <Box
          as="aside"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: ['row-reverse', 'column'],
            'a, button': {
              p: 3,
              color: 'white',
              width: 'auto',
              height: 'auto'
            },
            'button + a:last-of-type': {
              display: ['none', 'block'],
              mt: [null, -3]
            }
          }}
        >
          {actions}
          <IconButton as="a" href={url} target="_blank">
            {url.includes('github.com') ? (
              <GitHub size={32} />
            ) : (
              <ExternalLink size={32} />
            )}
          </IconButton>
        </Box>
        <Link
          target="_blank"
          href={url}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Heading
            as="h1"
            variant="headline"
            sx={{
              fontSize: [4, 5],
              color: 'white',
              my: 0,
              pr: 4,
              flex: '1 1 auto'
            }}
          >
            {name}
          </Heading>
        </Link>
      </Box>
      <Box
        as="section"
        sx={{
          display: thumbnail ? 'grid' : null,
          gridTemplateColumns: [
            null,
            thumbnail ? '96px 1fr' : null,
            thumbnail ? '166px 1fr' : null
          ],
          gridGap: thumbnail && [null, 4],
          bg: 'primary',
          color: 'white',
          px: [3, 4, 5],
          pb: 4
        }}
      >
        {thumbnail && (
          <Image
            src={image}
            alt="Project thumbnail"
            sx={{ display: ['none', 'block'], borderRadius: 'default' }}
          />
        )}
        <div>
          <Text as="p" sx={{ maxWidth: 'copyPlus', fontSize: [2, 3] }}>
            {desc}
          </Text>
          <Text
            variant="caption"
            as="p"
            sx={{
              mt: 3,
              color: 'inherit',
              opacity: 0.875,
              fontSize: [1, 2],
              textTransform: 'uppercase'
            }}
          >
            {creators}
          </Text>
        </div>
      </Box>
      <Box
        as="article"
        sx={{
          pt: [4],
          pb: [3, 4, 5],
          px: [3, 4, 5],
          'p, li': { fontSize: 2, maxWidth: 'copy' },
          'div:first-of-type': {
            borderRadius: 'extra',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ my: [3, 4], img: [3, 4] }}>
          {video && <Player url={video} width="100%" />}
          {image && !thumbnail && (
            <Image
              src={image}
              sx={{ width: '100%', borderRadius: 'default' }}
            />
          )}
        </Box>
        <BaseStyles dangerouslySetInnerHTML={{ __html: content }} />
        <Button
          variant="outline"
          as="a"
          href={devpost}
          sx={{ fontSize: [1, 2], mt: 3, mb: [4, 5] }}
        >
          See more on Devpost
        </Button>
      </Box>
    </Box>
  )
}
