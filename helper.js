/**
 * Static class with some helper functions.
 */
export class Helper {
  static replaceTagsWithHtml(input) {
    const imgRegex = /img=([a-zA-Z0-9_\-]+\.(jpg|png|gif))/g;
    const imgTemplate = '<img src="$1">';

    const youtubeRegex = /youtube=([a-zA-Z0-9_-]+)/g;
    const youtubeTemplate =
      '<iframe width="500" height="281" src="https://www.youtube.com/embed/$1?feature=oembed&amp;wmode=opaque&amp;rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen" title=""></iframe>';

    return input
      .replaceAll(imgRegex, imgTemplate)
      .replaceAll(youtubeRegex, youtubeTemplate);
  }
}
