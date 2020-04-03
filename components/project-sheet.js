import projects from '../lib/projects-content.json'
import { find } from 'lodash'
import {
  Badge,
  BaseStyles,
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  Link,
  Text
} from 'theme-ui'
import { GitHub, Maximize2, ExternalLink } from 'react-feather'
import Player from 'react-player'
import { getThemeByName } from '../lib/themes.js'

export default ({ actions, id, inModal = false }) => {
  const {
    theme: themeName,
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
  const theme = getThemeByName(themeName)
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
          bg: theme.color,
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
            position: ['relative', 'absolute'],
            m: [-3, 0],
            mb: 0,
            top: 0,
            right: 0,
            display: 'flex',
            flexDirection: ['row-reverse', 'column'],
            justifyContent: ['flex-start', 'center'],
            'a, button': {
              p: 3,
              color: 'white',
              width: 'auto',
              height: 'auto'
            },
            '* + a': {
              mt: [null, -3]
            }
          }}
        >
          {actions}
          {inModal ? (
            <IconButton
              title="Open on new page"
              as={Link}
              href={`/projects/${id}`}
            >
              <Maximize2 size={30} />
            </IconButton>
          ) : (
            <IconButton
              title="Open project website"
              as="a"
              href={url}
              target="_blank"
            >
              {url.includes('github.com') ? (
                <GitHub size={30} />
              ) : (
                <ExternalLink size={30} />
              )}
            </IconButton>
          )}
        </Box>
        <Link target="_blank" href={url} sx={{ pr: 4 }}>
          <Heading
            as="h1"
            variant="headline"
            sx={{
              fontSize: [4, 5],
              color: 'white',
              my: 0,
              display: 'inline',
              mr: [3, 4]
            }}
          >
            {name}
          </Heading>
          <Badge
            variant="lg"
            sx={{
              bg: 'sheet',
              color: theme.color,
              mt: 2,
              verticalAlign: 'bottom'
            }}
          >
            {theme.name}
          </Badge>
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
          bg: theme.color,
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
        {devpost && (
          <Button
            variant="outline"
            as="a"
            href={devpost}
            sx={{ color: theme.color, fontSize: [1, 2], mt: 3, mb: [4, 5] }}
          >
            See more on Devpost
          </Button>
        )}
      </Box>
    </Box>
  )
}
