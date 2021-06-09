import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Slider from 'rc-slider'
import { RiDiscLine } from 'react-icons/ri'

import 'rc-slider/assets/index.css'

import { usePlayer } from '../../contexts/PlayerContext'

import styles from './styles.module.scss'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [showModal, setShowModal] = useState('none');
  const [progress, setProgress] = useState(0)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    clearPlayerState,
    hasNext,
    hasPrevious
  } = usePlayer()

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  const episode = episodeList[currentEpisodeIndex]

  return (
    <>
      {/* <div className={styles.playerModal} style={{ display: showModal }}> */}
      {/* <div className={styles.playerContainerModal}>
          <header>
            <img src="/playing.svg" alt="Tocando agora" />
            <strong>Tocando agora</strong>
            <button onClick={() => setShowModal('none')}>
              <img src="/close-line.svg" alt="Fechar" />
            </button>
          </header>

          {episode ? (
            <div className={styles.currentEpisodeModal}>
              <Image
                width={592}
                height={592}
                src={episode.thumbnail}
                objectFit="cover"
              />
              <div>
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
              </div>
            </div>
          ) : (
            <div className={styles.emptyPlayerModal}>
              <strong>Selecione um podcast para ouvir</strong>
            </div>
          )}

          <footer className={!episode ? styles.empty : ''}>
            <div className={styles.progressModal}>
              <span>{convertDurationToTimeString(progress)}</span>
              <div className={styles.sliderModal}>
                {episode ? (
                  <Slider
                    trackStyle={{ backgroundColor: '#04d361' }}
                    railStyle={{ backgroundColor: '#9f75ff' }}
                    handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                    max={episode.duration}
                    value={progress}
                    onChange={handleSeek}
                  />
                ) : (
                  <div className={styles.emptySliderModal} />
                )}
              </div>
              <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>

            {episode && (
              <audio
                src={episode.url}
                ref={audioRef}
                autoPlay
                loop={isLooping}
                onPlay={() => setPlayingState(true)}
                onPause={() => setPlayingState(false)}
                onLoadedMetadata={setupProgressListener}
                onEnded={handleEpisodeEnded}
              />
            )}

            <div className={styles.buttonsModal}>
              <button
                type="button"
                disabled={!episode || episodeList.length === 1}
                onClick={toggleShuffle}
                className={isShuffling ? styles.isActive : ''}
              >
                <img src="/shuffle.svg" alt="Embaralhar" />
              </button>

              <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                <img src="/play-previous.svg" alt="Tocar anterior" />
              </button>

              <button
                type="button"
                className={styles.playButton}
                disabled={!episode}
                onClick={togglePlay}
              >
                {
                  isPlaying
                    ? <img src="/pause.svg" alt="Tocar" className={styles.pauseButton} />
                    : <img src="/play.svg" alt="Tocar" />
                }
              </button>

              <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
                <img src="/play-next.svg" alt="Tocar próxima" />
              </button>

              <button
                type="button"
                disabled={!episode}
                onClick={toggleLoop}
                className={isLooping ? styles.isActive : ''}
              >
                <img src="/repeat.svg" alt="Repetir" />
              </button>
            </div>
          </footer>
        </div>
      </div> */}



      <div className={styles.playerContainer}>
        <header>
          <img src="/playing.svg" alt="Tocando agora" />
          <strong>Tocando agora</strong>
        </header>

        {episode ? (
          <div className={styles.currentEpisode}>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />
            <div>
              <strong>{episode.title}</strong>
              <span>{episode.members}</span>
            </div>
          </div>
        ) : (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )}

        <footer className={!episode ? styles.empty : ''}>
          <div className={styles.progress}>
            <span>{convertDurationToTimeString(progress)}</span>
            <div className={styles.slider}>
              {episode ? (
                <Slider
                  trackStyle={{ backgroundColor: '#04d361' }}
                  railStyle={{ backgroundColor: '#9f75ff' }}
                  handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                  max={episode.duration}
                  value={progress}
                  onChange={handleSeek}
                />
              ) : (
                <div className={styles.emptySlider} />
              )}
            </div>
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>

          {episode && (
            <audio
              src={episode.url}
              ref={audioRef}
              autoPlay
              loop={isLooping}
              onPlay={() => setPlayingState(true)}
              onPause={() => setPlayingState(false)}
              onLoadedMetadata={setupProgressListener}
              onEnded={handleEpisodeEnded}
            />
          )}

          <div className={styles.buttons}>
            <button
              type="button"
              disabled={!episode || episodeList.length === 1}
              onClick={toggleShuffle}
              className={isShuffling ? styles.isActive : ''}
            >
              <img src="/shuffle.svg" alt="Embaralhar" />
            </button>

            <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
              <img src="/play-previous.svg" alt="Tocar anterior" />
            </button>

            <button
              type="button"
              className={styles.discButton}
              onClick={() => setShowModal('flex')}
            >
              <img src="/disc-line.svg" alt="Tocar" />
            </button>

            <button
              type="button"
              className={styles.playButton}
              disabled={!episode}
              onClick={togglePlay}
            >
              {
                isPlaying
                  ? <img src="/pause.svg" alt="Tocar" className={styles.pauseButton} />
                  : <img src="/play.svg" alt="Tocar" />
              }
            </button>

            <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
              <img src="/play-next.svg" alt="Tocar próxima" />
            </button>

            <button
              type="button"
              disabled={!episode}
              onClick={toggleLoop}
              className={isLooping ? styles.isActive : ''}
            >
              <img src="/repeat.svg" alt="Repetir" />
            </button>
          </div>
        </footer>
      </div>
    </>
  )
}